---
title: "Run integration-test with playwright inside a docker container, the pros and cons."
slug: "run-playwright-integration-test-in-docker-container"
tags: ["dev", "Playwright", "test", "integration-test", "docker"]
publishedAt: "2023-02-01T18:00:00"
lastModified: "2023-02-01T18:00:00"
description: "In order to eliminate the control variants of test when deal with flakiness or corporate with other engineers, put the test into a container is a great solution. But it comes after some caveats to set it up and maintain it. This article will share with you how to accomplish this task flawlessly."
featureImg: "/1984-the-roman-campagna.jpg"
featureImgAlt: "The Roman Campagna, 1984, John Gadsby Chapman"
featureImgSource: "https://www.metmuseum.org/art/collection/search/10435"
locale: "en-US"
---


You can checkout the example repo I use in this tutorial [here](https://github.com/EiffelFly/run-playwright-in-container-example)

## Why

Ok, this will be a little bit messy here. Normally we want to run our integration-test along with our development which does necessarily mean we want to run it on our host machine. Take Nextjs for example, we tend to have a `pnpm dev` script to set up the application and a `pnpm integration-test` to run `npx playwright test` for us. They both operate at the host machine, nothing else involved, wonderful, right?

But that is under a solo developer scenario. If you have multiple engineers both working on this project, the env configuration, os configuration, dependency, and Nodejs version may be different across them which may bring some flakiness , even fragile points to the integration test. In this scenario, you may begin to consider. Huh, how about we test all our integration-test inside a docker container?

Another issue will be related to the flakiness of the test. Sometimes, no matter how hard you do the test will somehow still be flaky. If you are in this scenario, you may consider bringing your test into a dedicated container to eliminate abundant control variants too. 

But you will also be hesitate to implement this feature due to the effort and the potential maintenance effort of this action. I want to bring up the pros and cons first then you could further decide whether to implement this feature or not.

### Pros

- Standalone environment for integration-test, it will be much cleaner. The environment variable and the script to use will be unified.
- Unify configuration across different developers.
- Suit for CI workflow, you only need a dockerfile to isolate all the weird configurations on the cloud.
- Overall, the variation is less them running the test in the host machine.

### Cons
- Hard to debug, you need to pull the test-results out from the container. (This article will share how to do that).
- There will be overhead to maintain this container it will cause additional communitcation cost (There are specific environment variable configurations that developers in your team need to acknowledge.)
- You need to keep a close eye on the network issue of the container

If you think this route suits your need then let's begin to implement this.

## How

### Setup the app and deps

Let's set up the simple repo for our tutorial

- Run `npx create-next-app@latest --typescript` create `src` but don't create `app` folder. In this way, we can simplify things.
- `npm init playwright@latest` to install playwright and initialize the config it needs. Inside the configuration file, there has a field called `testDir`. Please make sure it has the same name of the folder you put your tests (Right now it's `/integration-test`)
- Add additional script into `package.json` `"integration-test": "npx playwright test"`

This is our `package.json` file

```json
{
  "name": "run-playwright-in-container-example",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "integration-test": "npx playwright test"
  },
  "dependencies": {
    "next": "13.1.2",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "typescript": "4.9.4"
  },
  "devDependencies": {
    "@next/font": "13.1.2",
    "@playwright/test": "^1.29.2",
    "@types/node": "18.11.18",
    "@types/react": "18.0.26",
    "@types/react-dom": "18.0.10",
    "eslint": "8.32.0",
    "eslint-config-next": "13.1.2"
  }
}
```

This is our test example stays in the `<root>/integration-test`.

```js
// In /integration-test/example.spec.ts
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Create Next App/);
});
```

### Add .env file to store variables

You may need this file to store the variables and it needs to be included in the image too.

### Setup baseURL

Go to `playwright.config.ts` and find the config.use.baseURL field. And add your app's base URL (If you follow through this tutorial that will be http://localhost:3000)

let's do our test. `pnpm dev` then run `pnpm integration-test`. The test should pass.

### Setup the dockerfile for the playwright

This is the full dockerfile we are going to use. I add the comment above each line to explain the reason for each line of code.

```Dockerfile.playwright

# pull playwright docker image
# Because playwright's image has version, please pull the image that has the same version as your working playwright
FROM mcr.microsoft.com/playwright:v1.29.2-focal

# We do our dirty work inside app folder
WORKDIR /app

# You could definitely use Root user if you are confidient that your code is clean. But I highly suggest you use non-root user to operate the test
# But we make it as ARG so we can pass the --build-arg to alter the user of this image
ARG TEST_USER="playwright"

# I use pnpm so I need to add it right now. 
RUN npm install -g pnpm@7.5.0

# Copy the necessary file into image
COPY package.json pnpm-lock.yaml ./

# Install
RUN pnpm install --frozen-lockfile

# Create user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 playwright

# Copy permission needed file into image
COPY --chown=playwright:nodejs ./integration-test ./integration-test
COPY --chown=playwright:nodejs ./playwright.config.ts ./
COPY --chown=playwright:nodejs ./.env ./

# Setup user
USER ${TEST_USER}

RUN echo "test user: $TEST_USER"

CMD npx playwright install
```

- Note: Recommend using non-root user to operate your test in a docker. [^1]

### Add script for setting up docker

We will need to add these scripts for our test.

```json
"scripts": {
	"docker-build-test": "docker build -f Dockerfile.playwright --build-arg TEST_USER='root' -t integration-test-image .",
    "docker-run-test": "docker run --rm -t --network host integration-test-image",
}
```

Next, set up the dev server with `pnpm dev`, build the docker image with `pnpm docker-build-test` and run the test with `pnpm docker-run test`. But all the tests failed with the same error

```
page.goto: NS_ERROR_CONNECTION_REFUSED
```

### How to solve connection refused error

This error is a bit hard to understand in the first place when you don't look closely into how docker handles the network. In short, the request is firing within the docker container and it can't access the host machine's network which operate the app you just set up using `pnpm dev`

Thankfully, Docker Desktop 18.03+ for Windows and Mac supports `host.docker.internal` as a functioning alias for `localhost`. [^2] And if you are in Linux you can change your `pnpm docker-run-test` to `docker run --rm -t --add-host host.docker.internal:host-gateway integration-test-image` to use this feature.

Next step, we need to change playwright baseURL in the `playwright.config.ts` from `http://localhost:3000` to `http://host.docker.internal:3000`

Now, rebuild the image with `pnpm docker-build-test` and then `pnpm docker-run-test`. At this place, your tests should pass. 

The overall process is running our test in a container and running the app in the host. This is different from production which both microservices will run in a separate container. And it involves too many config and script on the way of operating the test. Let's refactor it to make it better.

### Wrap the app in the container and bridge them with a dedicated network

In this section, we will leverage the official example of Nextjs Docker[^3] and add some spicy on top of it. As above, each line of code will be commented about why we use it. 

First of all, we will use Nextjs standalone server in the docker, this will make things easier and it is closer to the situation on production. You have to add this `output: 'standalone'` in your `next.config.js`. The final config file will look similar to this.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
};

module.exports = nextConfig;
```

Then add this Dockerfile

```dockerfile
# Install dependencies only when needed
FROM --platform=$BUILDPLATFORM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN npm install -g pnpm@7.5.0

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# If using npm with a `package-lock.json` comment out above and use below instead
# COPY package.json package-lock.json ./ 
# RUN npm ci

# Rebuild the source code only when needed
FROM --platform=$BUILDPLATFORM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

RUN npm install -g pnpm@7.5.0

# You need to make sure the .env doesn't have senesitive data. Please store sensitive data at .env.local.
# Pay attention about the duplicated env variables, nextjs will always prioritize the .env file. Store the env variables
# at .env.local if they will conflict with the same variables on production, e.g. some variables comes from docker-compose.

COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN pnpm run build 

# Production image, copy all the files and run next
FROM node:16-alpine
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# You need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/package.json ./package.json

# We need to grant nextjs user to have the permission to alter the /public folder to
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Automatically leverage output traces to reduce image size 
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

# We need this permission for env.sh to create the __env.js in /public folder
RUN chmod +wx ./public

EXPOSE 3000

ENV PORT 3000

ENTRYPOINT ["node", "server.js"]
```

```json
scripts: {
	"docker-build-app": "docker build -f Dockerfile -t test-app-image .",
	"docker-run-app": "docker run --rm -t -p 3000:3000 test-app-image"
}
```

Next, use `pnpm docker-build-app` to check whether your docker image can build successfully or not, then run `pnpm docker-run-app` and access `http://localhost:3000` in your browser, you should see the Next.js 13 logo on the screen.

To run our test in the docker environment with both services stay inside a container, we need extra script to do that. These will be a multiple-step script, let me separate it for you to understand.

- `docker network create integration-test-network`: If you are using the default bridge network you can connect the container using their IP address but because we want to connect it with the container name, we have to create our network.
- `docker build -f Dockerfile -t test-app-image . && docker run -d --rm -t --network integration-test-network --name test-app test-app-image`: We build our app and connect it to the default bridge network of docker and we give it a name. To use `-d` is because we want to detach this command once the docker is set up and run the next command.
- `docker build -f Dockerfile.playwright --build-arg TEST_USER='root' -t integration-test-image . && docker run --rm -t --network integration-test-network --name integration-test integration-test-image`: We do the same for integration-test container, we don't need to detach integration-test container here because we want it to show us the complete test result.
- Because these two containers are both in the same network right now, we can access test-app container with the name we just gave it. Change the baseURL config in the `playwright.config.ts` to `http://test-app:3000`

So you will have two additional scripts, the first one is to create a network and the last one is to combine all the stuff above into a one-liner

```json
scripts: {
	"docker-create-test-network": "docker network create integration-test-network",
	"docker-integration-test": "docker build -f Dockerfile -t test-app-image . && docker run -d --rm -t --network integration-test-network --name test-app test-app-image && docker build -f Dockerfile.playwright --build-arg TEST_USER='root' -t integration-test-image . && docker run --rm -t --network integration-test-network --name integration-test integration-test-image"
}
```

Viola! After creating the network you can now use `pnpm docker-integration-test` to run your integration-test in the container!! But you can easily observe the code and the script is a bit messed up here and it may be hard to maintain in the long run. 

To make our life easier, we can use docker-compose to replace this tedious script.

### Docker-compose comes in rescue

Create a `docker-compose.test.yml` file in the root folder and add these lines below. 

```yml
version: "3.9"

# Setup a dedicated network using bridge driver
networks:
  integration-test-network:
    driver: bridge

services:
  test-app:
    container_name: test-app
    build:
      context: .
      dockerfile: Dockerfile
    networks:
      - integration-test-network
  integration-test:
    container_name: integration-test
    build:
      context: .
      dockerfile: Dockerfile.playwright
      args: 
        - TEST_USER=root
    networks:
      - integration-test-network
    depends_on:
      - test-app
```

Then we add this line of script into `package.json`. Remember that we use `--build` and `force-recreate` to force the whole docker-compose to rebuild the whole app and integration-test for us every time we run this script. If you want to use cache, please remove `force-recreate` flag.

```json
scripts: {
	"docker-compose-up": "docker-compose --file ./docker-compose.test.yml up --force-recreate --build"
}
```

Now, remember that we are using a bridge network, by default each container can access other containers by their services name. In this example, we need to set baseURL in the `playwright.config.ts` to `http://test-app:3000` and then run `pnpm docker-compose-up`

Viola! We successfully run our integration-test using docker-compose file and the code is much cleaner.

### How to debug your test when run in a container

When we encounter a bug in the integration test, playwright will give us a script to operate and open the debugger to facilitate the process of debugging. It will be similar to this.

`npx playwright show-trace test-results/example-has-title-webkit-retry1/trace.zip`

- If you are using html reporter, it will setup a server at http://localhost:9323 but that is the localhost inside the container, you can't open it from the browser of your host
- If you are using line reporter but didn't get the tract report, you may need to check whether the config is correct or not. In order to have this trace report you need to enable retries and set `use.trace:on-first-retry` or other configs [^4]

But this test-results file is in the container and it needs a browser to work correctly so you can't open it inside the container too. To use it, we need to copy it to our host, ideally our working directory. 

At the same time, the container had already exited at the moment it finish the test. So once we encounter some error in the normal flow of testing, we need to change some configurations to facilitate our debugging.

- Alter the entrypoint command in the `dockerfile.playwright` from `ENTRYPOINT [ "npx", "playwright", "test" ]` to `ENTRYPOINT ["tail", "-f", "/dev/null"]` In this way, the container will not operate the test suite and keep existing.
- Use `docker exec -it integration-test /bin/bash` to summon a terminal.
- Run the integration-test using the script we have `pnpm integration-test` in the terminal then get the failing report and the trace file.
- Use `docker ps` to get the working container's id and find the container with name `integration-test`
- At the root of this example, use `docker cp <container_id>:/app/test-results .` (app is the working directory this tutorial)

Now you will have your trace result at the root of this example.

## Caveat

### Align the version of the image and your playwright version

In this example, we are using `FROM mcr.microsoft.com/playwright:v1.29.2-focal` image in our `Dockerfile.playwright` file and it aligns with the playwright version in the `package.json`. Please make sure these two versions is the same, or you may encounter browser not found the issue [^5]

## Let's sum it up

- Test in the docker environment with both app and test container may be trick to set up but it will reduce the variant you need to control when deal with the flakiness of the test.
- Docker-compose is the best solution to leverage in this scenario.
- If you want to learn more about how to combating the flakiness of the test , you can read this article [Playwright tips that will make your life easier](https://www.summerbud.org/dev-notes/playwright-tips-that-will-make-your-life-easier)

[^1]: [Playwright - Docker - Run the image](https://playwright.dev/docs/docker#run-the-image)
[^2]: [From inside of a Docker container, how do I connect to the localhost of the machine?](https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach)[From inside of a Docker container, how do I connect to the localhost of the machine?](https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach)
[^3]: [Nextjs example - with-docker](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
[^4]: [Playwright - trace viewer](https://playwright.dev/docs/trace-viewer)
[^5]: [[Question] Playwright Docker image not finding browser #11719](https://github.com/microsoft/playwright/issues/11719)
