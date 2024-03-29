---
title: "如何讓 vscode 中的 markdown 文件自動斷行"
slug: "how-to-soft-wrap-vscode-mardown-file-only"
tags: ["lesson_learned", "softwrap", "mdx", "markdown"]
publishedAt: "2021-07-29T18:00:00"
lastModified: "2021-07-29T18:00:00"
description: "這篇文章將教你如何讓 Vscode 中的 Markdown 文件自動斷行，且不s影響其他文件"
featureImg: ""
featureImgAlt: ""
featureImgSource: ""
locale: "zh-TW"
---


如果你習慣用 Markdown 來寫作，以 Vscode 作為主要的編輯器，同時使用 `mdx-bundler`、`remarkjs`、`mdx` 來將這些 markdown 文件轉換成 HTML ，你可能也會遇到相同的問題：文句不會自動斷行，如果自行斷行的話，又會影響 HTML 的生成。

這個時候你就需要 vscode softwrap（自動斷行）的功能，它只會影響編輯器裡看起來的模樣，而不會影響實際生成的程式碼。你可以在 vscode - settings.json之中加入以下設定檔即可啟動這個功能。

```json
"editor.wordWrap": "wordWrapColumn",
"editor.wordWrapColumn": 100, // 限制最高寬度只有 100 個字元
```

雖然 markdown 文件成功斷行，其他類型的文件也統一被斷行了。縱使 softwrap 不會影響實際的程式碼，但是視覺上還是會造成困惑。如果在大型 js 專案之中使用 prettier 託管程式風格時，更是如此（printWidth）。

因此我們需要限制這個設定執行的文件類型，幸好 VScode 1.9 以後我們可以指定這件事。

```json
"[mdx]": {
	"editor.wordWrap": "wordWrapColumn",
	"editor.wordWrapColumn": 100,
},
"[markdown]": {
	"editor.wordWrap": "wordWrapColumn",
	"editor.wordWrapColumn": 100,
}
```

Voila! 只有 markdown 或是 mdx 文件會自動斷行了，是不是很方便阿。


### 參考資料

- [How to keep Soft Line Wrap at Column width Visual Studio Code and MarkDown](https://jonathanmh.com/keep-soft-line-wrap-column-width-visual-studio-code-markdown/)
- [VS Code: markdown and word wrap](https://jmarcher.io/vs-code-markdown-and-word-wrap/)
- [Better line wrapping for markdown files (and other relevant file types) #17948](https://github.com/microsoft/vscode/issues/17948)
- [VScode 1.9 - Language specific settings](https://code.visualstudio.com/updates/v1_9#_language-specific-settings)