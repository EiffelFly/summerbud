---
title: "如何在 mdx-bundler 的專案中施作註解（Footnotes）"
slug: "how-to-implement-footnotes-in-mdx-bundler-project"
tags: ["lessen_learned", "blog", "nextjs", "markdown"]
publishedAt: "2021-07-30T07:38:00"
lastModified: "2021-07-30T07:38:00"
description: "這篇文章將教你如何使用 mdx-bundler, remark-footnotes 插件以及 tailwind css 來施作註記"
featureImg: ""
featureImgAlt: ""
featureImgSource: ""
locale: "zh-TW"
---

### 大綱

1. Intro
2. 操作方法
3. 未來研究

### Intro

Footnote 是很好用的工具，它不僅可以把一些不影響行文，但是會影響整篇文章的完整性的段落重新分配到文章的底部。更是一個方便閱讀者搜尋所有引用資料的方式。

在一開始我以為 markdown 語法中已經自備 Footnote 的處理方式，尋找一陣子並且在相關論壇詢問其他人後才明瞭，Footnote 的功能並不被包含在 John Gruber 一開始設計的語法之中[^1]。同理，許多轉換 markdown 的套件如 remark 也並沒有把這些附加的功能列歸為預設的服務。

在這個以 Next.js + MDX + mdx-bundler 的專案之中，負責處理 mdx 轉換的是 mdx-bundler，它使用 xdm 作為核心工具， xdm 則使用 remark-parse V9.0.0。而 remark 並沒有預設納入 footnote 功能，因此如果你直接這樣寫：

```md
- here is the first footnote [^1]
[^1]: I am the footnote
```

是不會有任何效果的。我們需要使用 remark footnote plugin[^2] 來處理這件事。幸好 mdx-bundler 有預設讓我們管理 xdmOptions 的 API[^3]，透過它我們可以丟入自己想要使用的 remark 或是 rehype 插件。

### 操作方式

1. 安裝 remark-footnotes v3.0.0

首先讓我們先安裝 remark-footnotes `npm install remark-footnotes@3` 這邊要特別注意我們要安裝的是 version 3.0.0。version 2.0.0 會遇到一些處理上的問題，它會吃掉 footnotes 而只留下不完整的連結[^4]。此外，如果你不是使用 mdx-bundler，你需要注意該套件是否是使用 remark-parse V9.0.0[^5]。

2. 指定 xdm 使用該插件

```js
import footnotes from "remark-footnotes";
const { code } = await bundleMDX(source, {
  cwd: cwd,
  xdmOptions: (options) => {
    options.remarkPlugins = [...(options.remarkPlugins ?? []), footnotes];
    return options;
  },
});
```

3. 調整視覺設計

```css
a.footnote-backref {
  margin-left: 10px;
  text-decoration: none;
}

sup {
  padding: 0 6px 0 4px;
}
```

### 未來研究

我發現有一點讓人非常煩惱： ↩ U+21A9 這個 Unicode 會自動轉換成與部落格本身風格不搭的 Emoji。針對這個問題我還沒有優雅的方式可以解決。如果你有任何解法的話，歡迎跟我分享！

[^1]: [Markdown guide - Extended Syntax](https://www.markdownguide.org/extended-syntax/#overview)
[^2]: [remarkjs/remark-footnotes ](https://github.com/remarkjs/remark-footnotes)
[^3]: [ kentcdodds/mdx-bundler # xdmOptions](https://github.com/kentcdodds/mdx-bundler#xdmoptions)
[^4]: [some nuxt.js problem similar us when using remark-footnote v2.0.0](https://codesandbox.io/s/busy-jennings-vbogj?file=/content/index.md)
[^5]: [remarkjs/remark-footnotes v3.0.0 release note ](https://github.com/remarkjs/remark-footnotes/releases/tag/3.0.0)
