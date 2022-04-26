---
title: "How to - 如何在 Storybook 中加入 TailwindCSS"
slug: "add-tailwindcss-into-storybook"
tags: ["how-to", "storybook", "tailwind-css"]
publishedAt: "2021-10-07T12:00:00"
lastModified: "2021-10-07T12:00:00"
description: "這篇文章將和你分享如何在 Storybook 裡使用 TailwindCSS"
---

以往在設立 CRA、Vue、Vite、Next 的專案時，往往都會有 `npx --template` 可以使用，然而 Storybook 縱使有 `npx sb init`，也無法幫我們自動插入 TailwindCSS 的設定。這篇文章將跟大家分享如何在 Storybook 裡使用 TailwindCSS。（如果你是使用 CRA 請參考這一篇[^1]）

如果你是用 `npx create-next-app -e with-tailwindcss my-project` 架起整個專案，你將自帶 PostCSS8 的設定[^2]。然而 Storybook 當前的預設值為 PostCSS7，為了讓兩者兼容，我們將使用 `@storybook/addon-postcss`[^3] 來讓 Storybook 使用 PostCSS8。（幸好未來 Storybook 將 deprecated postCSS7 預設的設定[^4]）

首先，安裝 postCSS8。

`npm i --save-dev postcss@^8`

在 root folder 創建 postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

然後在 `.storybook/main.js` 中加入以下 addon

```js
const path = require('path');

module.exports = {
  stories: ...
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
	
	/// 加入以下設定 ///
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
	///
	
  ],
};
```

並且在 `.storybook/preview.js` 中 import `tailwind.css`[^5]

```js
import 'tailwindcss/tailwind.css';
```

Voilà

這樣你就成功將 TailwindCSS 導入 Storybook 了


[^1]: [Building a front end project with React, TailwindCSS and Storybook | Medium](https://medium.com/storybookjs/building-a-front-end-project-with-react-tailwindcss-and-storybook-742bdb1417da)
[^2]: [Install Tailwind CSS with Next.js - Tailwind CSS](https://tailwindcss.com/docs/guides/nextjs)
[^3]: [@storybook/addon-postcss Addon | Storybook](https://storybook.js.org/addons/@storybook/addon-postcss)
[^4]: [storybook/MIGRATION.md at next · storybookjs/storybook (github.com)](https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#from-version-61x-to-620)
[^5]:[reactjs - Tailwind css classes not showing in Storybook build - Stack Overflow](https://stackoverflow.com/questions/68020712/tailwind-css-classes-not-showing-in-storybook-build)