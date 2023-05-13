---
title: "如何解決 Nextjs 開發不同專案時，於 localhost:3000 發生的轉址 cache 衝突"
slug: "redirect-cache-issue-when-developing-next-in-same-localhost-port"
tags: ["lesson_learned", "nextjs", "status_code"]
publishedAt: "2021-08-17T12:00:00"
lastModified: "2021-08-17T12:00:00"
description: "在 next.js 的開發中我們習慣用 next.config.js 來指定轉址，這樣不管在 develop 還是 production 環境中都可以導引到我們期待的網址，然而這卻會因為我們的 cache 而產生衝突，進而引發一些讓人困惑的轉址錯誤"
featureImg: ""
featureImgAlt: ""
featureImgSource: ""
locale: "zh-TW"
---

### 大綱

1. 發生情境
2. 原因
3. 解決方法
4. 延伸閱讀

### 發生情境

在 Next.js 的專案裡，我們可以直接在 dev 環境之中輕鬆地設置 rewrite & redirect[^1]，例如說在我個人的部落格中，每個進入 root url 的訪客都會被我導引到他們所屬的語系。

```js
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/en",
				permanent: true,
			}
		]
	}
}
module.exports = nextConfig
```

事情進行得很順利，不管是在 production 還是 development 都可以成功導引訪客到目標網址。然而當我想要開發另外一個 nextjs 專案，並且在 development 時使用同樣的開發網址 http://localhost:3000 你會發現事情怪怪的，即使沒有在 `next.config.js` 指定轉址，它一樣把你轉到了 http://localhost:3000/en

### 原因

這個功能被稱為 browser redirect cache[^2]，所有主流瀏覽器都具有這個功能。這件事取決於你使用哪種 status code 來轉址網址。它細分為 

- 301: Moved Permanently[^3]
- 302: Found[^4]
- 307: Temporary Redirect[^5]
- 308: Permanent Redirect[^6]

瀏覽器會經由這些 status code 來判斷你的轉址形式，但你還是可以藉由 cache-control 來控制瀏覽器是否對此行為 cache。舉例來說，你可以在使用 308 Permanent Redirect 的情況下，於 header 指定 `Cache-control: no-cache`，如此一來，縱使你使用 308 該瀏覽器一樣不會 cache 轉址指令。只不過這就失去了使用 status code 的意義了。

在 Next.js 的專案中，我們使用 `permanent: true` 這個設定來判斷這件事，如果設定值為 `true` Next 會自動以 308 轉址。相反的，設定為 `false` 則使用 307。[^7]

那接下來的問題就會是，如果我想要在 production 環境設置 308 Permanent Redirect，但在本地開發其他專案時，想要使用同一個 Port 卻又不想被 cache 影響該怎麼做。

### 解決方法

1. 無差別：每次轉換開發專案時就清理一次 cache（清除瀏覽記錄）
2. 只清理 localhost:3000：在轉換專案時，進入 Google Developer tool -> Network -> check disable cache（Chrome）後於 http:localhost:3000 長按重新整理鈕，「選擇清除快取並強制重新載入」（Chrome） -> uncheck disable cache
3. 使用 Browser hard refresh[^8]


使用這三種方法其一後，瀏覽器就不會 cache 轉址指令。在同一個 port 開發時也不會有突然被莫名轉址的問題了！

當然你也可以在開發中指定使用其他的 port，方法很簡單，在 `package.json` 的設定檔中改動 dev 指令即可。[^9]

```json
"dev": "next dev"

"dev": "next dev -p 3001"
```

### 延伸閱讀

- [308 Permanent Redirect: What It Is and How to Fix It](https://airbrake.io/blog/http-errors/308-permanent-redirect)


[^1]: [Next.js official doc - Redirect](https://nextjs.org/docs/api-reference/next.config.js/redirects)
[^2]: [How long do browsers cache HTTP 301s?](https://stackoverflow.com/questions/9130422/how-long-do-browsers-cache-http-301s)
[^3]: [301 Moved Permanently - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301)
[^4]: [302 Found - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302)
[^5]: [307 Temporary Redirect - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/307)
[^6]: [308 Permanent Redirect - HTTP | MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/308)
[^7]: [Removing redirects() from next.config.js does not work #17069](https://github.com/vercel/next.js/issues/17069)
[^8]: [How to hard refresh - bypassing cache](https://en.wikipedia.org/wiki/Wikipedia:Bypass_your_cache#Bypassing_cache)
[^9]: [Next.js official doc - CLI#Development](https://nextjs.org/docs/api-reference/cli#development)
