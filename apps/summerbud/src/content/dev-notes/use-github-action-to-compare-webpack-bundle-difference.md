---
title: "如何使用 github action 於佈建 Next.js 專案時自動比較 Webpack bundle 差異"
slug: "use-github-action-to-compare-webpack-bundle-difference"
tags: ["how-to", "webpack", "github-action", "ci"]
publishedAt: "2021-10-03T12:00:00"
lastModified: "2021-10-03T12:00:00"
description: "前端開發中，在佈建 production 環境之前有許多測試需要做。這篇文章分享了如何使用 github action 自動比較功能分支與 production bundle 大小的差異。"
featureImg: ""
featureImgAlt: ""
featureImgSource: ""
locale: "zh-TW"
---

前端開發中有許多在實際佈建前需要確認的事，諸如與 API 端口的連接狀況、小物件的穩定測試、串接 Lighthouse 測試 SEO 分數、甚至是使用 cypress 進行使用者體驗的測試等等。為了方便我們都會將它整合在 CI/CD 的流程裡。

最近，我理解到 Webpack bundle 的大小差異同樣是值得確認的事項，因此決定將這個流程納入 CI/CD 的一環之中，卻在實作上踩了大大小小的地雷。這篇文章將過程中的問題整理出來，期待讓後續也想要充實自身 CI/CD 流程的人，可以少走一點冤枉路。

### 在 Next.js 專案中啟用 webpack-bundle-analyzer

雖然 Next.js 有在 webpack-bundle-analyzer 加上一層自己的虛擬層構成的 @next/bundle-analyzer[^1] 可以使用，但還是建議在 next.config.js 裡設定 webpack-bundle-analyzer，可以較靈活地使用各種功能。

這邊要注意的是，雖然指令 `analyzerMode: "json"` 所產出的資料也具有可被分析的數據，但是普遍的 webpack-diff actions，如 chronotruck/webpack-stats-diff-action[^2]以及我們這次使用的 NejcZdovc/bundle-size-diff[^3] 都不支援這個指令下輸出的資料。我們必須使用`analyzerMode: "disabled", generateStatsFile: true` 輸出的資料。

```js
module.exports = {
	webpack: (config, { isServer }) => {
		const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
		config.plugins.push(
		  new BundleAnalyzerPlugin({
			analyzerMode: "disabled",
			generateStatsFile: true,
			reportFilename: isServer
			  ? "../analyze/server.json"
			  : "./analyze/client.json",
		  })
		);

		return config;
  	},
}

```

### Github action

在使用這組 Github action 時需要注意三件事：

1. download-artifact 的版本至關重要，v1 在未指定 path 的情況下會自動以你指定的名稱製作同名的資料夾，並將檔案置放於該資料夾下。但在 v2 你必須指定 path 它才會做這件事，所以如果你的檔案同名的話，它會因為放在同一個資料夾下而被覆蓋。[^4]
2. `NejcZdovc/comment-pr@v1.1.1` 需要你指定一個 markdown template，並如範例那般制定 placeholder[^5]。我將其置放在 `.github/templates/webpack-diff-comment.md` 的路徑下。
3. 如果你想要比較 Server side bundle 的大小的話，next 同樣有提供這個分析檔，只不過路徑不同，正確路徑如下：`.next/server/chunks/stats.json`

```
name: ci-webpack-stats-diff

on:
  pull_request:
    branches:
      - 'staging'

jobs:
  build-pr:
    name: 'Build PR stats'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload stats.json
        uses: actions/upload-artifact@v2
        with:
          name: pr
          path: .next/stats.json

  build-base:
    name: 'Build base stats'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
        with:
          ## Here we do not checkout the current branch, but we checkout the base branch.
          ref: ${{ github.base_ref }}

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload stats.json
        uses: actions/upload-artifact@v2
        with:
          name: base
          path: .next/stats.json

  compare:
    name: 'Compare base & head bundle sizes'
    runs-on: ubuntu-latest
    needs: [build-pr, build-base]
    steps:
      - name: Checkout PR
        uses: actions/checkout@v2

      - name: Download base artifact
        uses: actions/download-artifact@v2
        with:
          name: base
          path: base

      - name: Download PR stats
        uses: actions/download-artifact@v2
        with:
          name: pr
          path: pr

      - name: Get diff
        id: get-diff
        uses: NejcZdovc/bundle-size-diff@v1
        with:
          base_path: './base/stats.json'
          pr_path: './pr/stats.json'

      - name: Comment
        uses: NejcZdovc/comment-pr@v1.1.1
        with:
          file: '../templates/webpack-diff-comment.md'
        env:
          GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
          OLD: ${{steps.get-diff.outputs.base_file_string}}
          NEW: ${{steps.get-diff.outputs.pr_file_string}}
          DIFF: ${{steps.get-diff.outputs.diff_file_string}}
          DIFF_PERCENT: ${{steps.get-diff.outputs.percent}}
```

```md
webpack-diff-comment.md
you can change whatever you need, but do keep the placeholder

## Bundle size diff

| Old size | New size | Diff                     |
| -------- | -------- | ------------------------ |
| {OLD}    | {NEW}    | {DIFF} ({DIFF_PERCENT}%) |
```


### 固定時間移除 artifact

如此一來我們需要固定時間清除 artifact，為了達成這個目的我們可以設定 cron job 如下。

```
name: cron-remove-old-artifacts-daily

on:
  schedule:
    - cron: '0 1 * * *' # Every day at 1am

jobs:
  remove-old-artifacts:
    runs-on: ubuntu-latest
    timeout-minutes: 10

    steps:
      - name: Remove old artifacts
        uses: c-hive/gha-remove-artifacts@v1
        with:
          age: '1 day'
          skip-tags: true
```

Voilà！這樣你就可以有個自動化的 pr 小精靈，每一次 PR 新的資料都會提醒你 bundle 大小與上一版的差異了！


[^1]: [npm - @next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)
[^2]: [chronotruck/webpack-stats-diff-action](https://github.com/chronotruck/webpack-stats-diff-action/blob/dev/index.js)
[^3]: [NejcZdovc/bundle-size-diff](https://github.com/NejcZdovc/bundle-size-diff)
[^4]: [download-artifact # Compatibility between v1 and v2](https://github.com/actions/download-artifact#compatibility-between-v1-and-v2)
[^5]: [NejcZdovc/comment-pr](https://github.com/NejcZdovc/comment-pr)