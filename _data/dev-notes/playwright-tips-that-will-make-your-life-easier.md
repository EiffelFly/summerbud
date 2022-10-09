---
title: "Playwright tips that will make your life easier"
slug: "playwright-tips-that-will-make-your-life-easier"
tags: ["dev", "Playwright", "test", "integration-test"]
publishedAt: "2022-10-09T18:00:00"
lastModified: "2022-10-09T18:00:00"
description: "Playwright is a good tool for cross-browser integration testing. As usual these tools are usually complex and it takes time to learn them. I would like to share some tips of Playwright that will make your life easier when working with it."
featureImg: "/1748-a-masket-ball-in-bohemia.jpeg"
featureImgAlt: "A Masked Ball in Bohemia, 1748, Andreas Altomonte"
featureImgSource: "https://www.metmuseum.org/art/collection/search/436861"
locale: "en-US"
---

Recently I began to help our company implement integration tests and encounter dozens of issues that bother me a lot. Including how to correctly assert elements. How to efficiently wait for an element and most important of all, how to combat the flaky tests.

I found out there has not many resources to discuss this kind of topic and I dip very deep into Playwright issues, discussion, and documentation to find these tips. I think they are all very useful and they makes my life easier.

## General tips

### Use locator!

- The locator will activate the auto-wait feature and the retry ability.
- The locator will stay up-to-date even if the DOM has changed. The example below shows that the locator of submit button will track the most up-to-date element. This makes the test smoother and reduces the possibility of a flaky test.
```js
const locator = page.locator('text=Submit');  
await locator.hover();  
await locator.click();

// This uses ElementHandler
const handle = await page.$('text=Submit');  

// handle will always point to the non-hoverable/stale element 
// which may cause issues
await handle.hover();  
await handle.click();

```

### Playwright auto-wait feature

In short, the auto-wait feature means "Hey, when you are going to perform some behavior like CLICK, FILL or HOVER... etc, we will check whether the element is in the state that can carry on these tasks or not, if the conditions met we will perform the behavior, otherwise we will wait until the timeout exceed." [^1]

Before I notice this feature I write some tests like this.

```js
test("this is BAD", () => {
	const submit = page.locator("button", {hasText: "Next"});

	// I will check whether button is enabled even it is always 
	// enbled
	expect(await submit.isEnabled()).toBeTruthy()
	await submit.click();

})
```

This code is bad not only you are wasting your testing time on a non-necessary assertion but also cause some unreliable consequence in some other scenario like fill in the field. You should rely on Playwright's auto-wait nature and let them do the heavy lifting work.

```js
test("this is GOOD", () => {
	const button = page.locator("button", { hasText: "Next" });
	
	// Click the button and let playwright do the actionability 
	// checking
	await button.click();

})
```

### Don't test for playwright

Sometimes it feels tempting to make sure every step fulfills your needs like the below.

```js
test("this is not that good", () => {
	const emailField = page.locator("input#email");
	await emailField.fill("example@gmail.com");
	await expect(emailField).toHaveValue("example@gmail.com")

})
```

This looks normal and even responsible at the first glance. But you are testing for Playwright. Due to the nature of auto-waiting Playwright will check whether the field can input or not. If it is not it will be timeout at the filling step, so I think generally speaking this assertion is not necessary.

### Always use Promise.all to avoid race condition

Because we are all in an async function when we utilize Playwright, there will have race conditions if we don't control the flow. [^2]

```js
test("this will have race condition", () => {
	const next = page.locator("button", {hasText: "submit"});
	await next.click()
	await page.waitForResponse("url")
})
```

The above snippet showcases a scenario if somehow the URL response is before we click the next button (Playwright is a very fast machine), the `await page.waitForResponse("url")` will be stall. In order to eliminate this kind of race condition, we should utilize `Promise.all`.

```js
test("this will have race condition", () => {
	const submit = page.locator("button", {hasText: "submit"});

	await Promise.all([
		// We start waiting for response
		page.waitForResponse("url"),
		
		// We click the button
		submit.click()
	])
})
```

In this way, we can safely make sure we wait for the click and the response is finished. None of them will be left behind.

But you should not put multiple actions in one Promise.all(), It will act like multiple people controlling the keyboard at the same time which causes the un-predictable result. [^3]

```js
test("this is bad", () => {
	const emailField = page.locator("input#email");
	const nameField = page.locator("input#name");

	await Promise.all([
		page.waitForResponse("url"),
		emailField.fill("admin@gmail.com"),
		nameField.fill("Hi")
	])
})
```

### Use locator.waitFor if you have the visual indicator

There are dozens of waitFor in the Playwright [^4] and they are very useful in different contexts. In my journey of implementing the integration tests, I found out that `locator.waitFor` is very reliable if you have a visual indicator. I will take a submit form for example. The form is very easy, fill in the email, click submit button, send the request to the server, respond with userID, and display a welcome message. The test may look like the below.

```js
test("this have possibility to be flaky", () => {
	const emailField = page.locator("input#email");
	const submit = page.locator("button", {hasText: "submit"});
	await emailField.fill("admin@gmail.com")
	
	await Promise.all([
		page.waitForResponse("user-end-point"),
		submit.click()
	])
})
```

Let's say we have a user endpoint on `http://localhost:3000/user`. When creating the user we will post request to this endpoint. When getting the user information we will get request to this endpoint too. If we still need to constantly get the user's information on this form or if there has global state management which will constantly utilize this endpoint, Playwright may feel confused.

Take the test below as an example. It will be flaky if in the middle of the `Promise.all` Playwright did get the response but it's not due to the submission.

The safest way of doing so is by relying on a visual indicator and use `locator.waitFor`[^5] to wait for the indicator to show up on the screen.

```js
test("this is stable", () => {
	const emailField = page.locator("input#email");
	const submit = page.locator("button", {hasText: "submit"});
	const succeedMessage = page.locator("h3", {hasText: "Succeed"});
	await emailField.fill("admin@gmail.com")
	
	await Promise.all([
		succeedMessage.waitFor("visible"),
		submit.click()
	])
})
```


## How to combat flaky test

### Examine the root cause

The root cause of the flaky test is diverse. It's hard to list them all in this article. But I can share some tips about how to find them.

#### Use playwright debug mode 

There are two different kinds of debug modes in Playwright.[^6]

-  `npx playwright test --debug`
	- This is the killer feature of Playwright, it will display a debug inspector to let you observe what the browser actually did in every step. Use this mode to check whether your locator is correct!
- `PWDEBUG=1 npx playwright test`
	- In short, What PWDEBUG mode does is "Hey I will run the browser in headed mode and disable the timeout, so the browser won't close and your test flow won't be interrupted." This will come in handy if you just want to make sure every step of your test is correct. [^7]

Pick one that suits your needs, but remember in `--debug` mode your click action is much slower than the real testing actions some tests may pass in `--debug` mode but fail when you run the test without it. 

#### Utilize --repeat-each to observe flaky test

The way to observe a flaky test is by repeatedly operating a test. You can achieve that with `npx playwright test --repeat-each=<time_you_want_to_run>`. When you find a set of tests is flaky, I recommend using this flag and focusing on one test at a time. [^8]

You could point to the specific test by using a colon and a line number. Take the snippet below as an example you could specifically test with it`npx playwright test form.spec.ts:13`

```js
test("this is stable", () => { // This is at line 13 of form.spec.ts
	const emailField = page.locator("input#email");
	const submit = page.locator("button", {hasText: "submit"});
	const succeedMessage = page.locator("h3", {hasText: "Succeed"});
	await emailField.fill("admin@gmail.com")
	
	await Promise.all([
		succeedMessage.waitFor("visible"),
		submit.click()
	])
})
```

#### Use page.on(”console”) to load useful information

You may have many `console.log` around your code to make you know better what happened in the frontend. You can use this line of code to log them in the terminal.

```js
page.on("console", (m) => console.log("BROWSER: ", m.text()));
```

#### Make sure every steps are correctly waited.

I found out this is usually the number one factor that causes a flaky test. Just like I mentioned above, utilize `Promise.all()` to correctly wait for the test.

#### Utilize your trace

Playwright provides `--trace` flag to let you know what happened during the test. It will record every `console.log`, network activity, and the action playwright conducted. The recommended way of doing the trace is only to record it when the first test is failing. Generally speaking, this is enough, but when you are facing a flaky test you will record the passed test (by definition flaky test means the first test failed but the second test passed) which is not helpful. [^9]

```js

// Retry when the test failed
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  retries: 1,
  use: {
    trace: 'on-first-retry',
  },
};

export default config;
```

You could set the trace to on and keep the retry to one. In this way, you could observe the flakiness of the test and the trace of the test at the same time.

```js
// Retry every test
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  retries: 1,
  use: {
    trace: 'on',
  },
};

export default config;
```

### Test is natively fast, and it is really fast

Disable some crucial action if your request hasn't finished yet. Let's say you have a form that needs to fetch a set of information to correctly construct a dropdown. In a normal situation, that request only takes a blink of time and the user won't even notice the dropdown's data is not complete. 

```js
test("this is stable", () => { // This is at line 13 of form.spec.ts
	const emailField = page.locator("input#email");
	const submit = page.locator("button", {hasText: "submit"});
	await emailField.fill("admin@gmail.com");

	// Playwright may timeout in this action due to the request is not finished yet.
	const dropdown = page.locator("select#dropdown");
	await dropdown.selectOption("option-fetched-from-backend")
	
	const succeedMessage = page.locator("h3", {hasText: "Succeed"});
	
	
	await Promise.all([
		succeedMessage.waitFor("visible"),
		submit.click()
	])
})

```

In this scenario, your test may be flaky because the Playwright is too fast (You will certainly pass this test in debug mode) It only takes 100ms to finish the actions before selecting the dropdown and it begins to interact with the dropdown. If the request somehow is slower this time this test will fail because there doesn't have any data exist.

The solution is to disable your dropdown when the data is not ready. With the auto-waiting nature of Playwright, it will wait a set amount of time, you can even expand the timeout specific to this action. [^10]


### Understand your backend

If your integration test involves interaction with the backend, some of the flakiness may come from there.

#### Check whether your backend can take multiple request at a time

If your backend can only handle a single request at a time you should disable the parallel nature of Playwright. In your configuration file, you could achieve this through this configuration. [^11]

```js
const config = {
	/* Opt out of parallel tests */
	workers: 1,
}
```

#### Check if your operation need to be sequence

If you want your test run in sequences you could leverage the native support of serial tests.

```js
test.describe.serial("This will be a test run in sequence", () => {
	test("test 1", () => {});
	test("test 2", () => {});
}
```

Or you could separate the test into different test files as a "Test List File", disable the parallel operation of Playwright like the above, and import these files in order. [^12]

#### Check if your backend have special issue

In our backend, when we create a model we need to fetch the target model from GitHub or HuggingFace which will take an extra amount of time. Not only it take longer to finish, but it will also be affected by the internet condition at that moment. These all add up quickly and make the test exceed its timeout limit.

You could have several ways to solve these problems.

- Make some operation timeout much longer. Almost all playwright locators, waitfor, and expect have fine-grained timeout option. You can leverage this option to extend the timeout.

```js
test("this have possibility to be flaky", () => {
	const emailField = page.locator("input#email");
	const submit = page.locator("button", {hasText: "submit"});
	await emailField.fill("admin@gmail.com")
	
	await Promise.all([
		page.waitForResponse("user-end-point"),
		submit.click()
	])
})
```

- Mock the data in the backend and don't test for the 3rd party interaction. I think this one is better compared to the first one. You could set up an env variable flag that indicates the whole backend session is for integration test and mock the model that takes extra time to create due to they are connecting with 3rd party source. In this way, your test will be quicker and more reliable.

## Sum up

I think there are three rings that rule them all.

- Use `Promise.all` to avoid race conditions.
- Disable your field when you haven't finished fetching data.
- Use the locator!

Alright, that is enough for today. Playwright is a very good tool. Hope you find the power of it.

[^1]: [Playwright - Auto-waiting](https://playwright.dev/docs/actionability)
[^2]:  [doc: Why use Promise.all when await works? #5470](https://github.com/microsoft/playwright/issues/5470)
[^3]: [[BUG] Multiple type commands in one Promise.all do not resolve correctly #12776](https://github.com/microsoft/playwright/issues/12776)
[^4]: [Playwright - Page](https://playwright.dev/docs/api/class-page#page-wait-for-event)
[^5]: [Playwrihgt - locator.waitFor](https://playwright.dev/docs/api/class-locator#locator-wait-for)
[^6]: [Playwright - Debug](https://playwright.dev/docs/debug)
[^7]: [Playwright - Debug#PWDEBUG](https://playwright.dev/docs/debug#pwdebug)
[^8]: [Playwright - CLI#Reference](https://playwright.dev/docs/test-cli#reference)
[^9]: [Playwright - Trace Viewer](https://playwright.dev/docs/trace-viewer-intro)
[^10]: [End-to-End Testing: Fixing a Flaky Test and Avoiding Sleeps with Playwright](https://rwoll.dev/posts/understanding-flaky-tests-and-avoiding-timeouts-with-playwright)
[^11]: [Parallelism and sharding](https://playwright.dev/docs/test-parallel)
[^12]: [Playwright - Parallelism and sharding#Contro test order](https://playwright.dev/docs/next/test-parallel#control-test-order)