---
title: "如何創造你自己的 git commit message 系統"
slug: "construct-your-own-git-commit-message-system"
tags: ["lessen_learned", "git", "emoji"]
publishedAt: "2021-08-21T12:00:00"
lastModified: "2021-07-21T12:00:00"
description: "Git commit 是一件雖然細小，卻有可能會影響你的程式碼質量的事，這篇文章分享了我使用 git commit 的方法論，並分享了 Vscode keyboard shortcuts 設定檔，歡迎修改成適合你的樣子"
featureImg: ""
featureImgAlt: ""
featureImgSource: ""
locale: "zh-TW"
---

### Intro

第一次用 git 來管理專案時，我的 commit 沒有依循的規則，只會簡短地打上 commit 中完成的事項。例如說 Hololink 早期的 commit 這樣寫 `完成HowItWorks_layout 以及放進文字` 。如此作法的結果是我的 commit 的尺度非常不規則，有時候甚至會不小心塞入無關這次改動的程式碼。我隱約理解到即使是細小如 git commit 這件事，都可能會影響程式碼的質量。

### 任務型 Commit

隨後我採取「任務型」的 commit 方式，端看我那時集中於處理哪種任務，我的 commit 就會以該任務作為前綴。例如說`[Backend bottleneck optimization] - fix duplicated hologramNodeGroup issue` 或是 `[Vuex naming debt] - rename hologram/data to hologram/node and hologram/edge`，藉由這種規則，我強迫我在每次 commit 前都要預先構思這次的尺度包含哪些程式碼，而這類思考深遠地影響了我開發的程式規模。我開始細分開發的尺度，將過大的不斷切小，直到我可以清楚知道我的 commit 該怎麼寫。

然而使用一陣子後我發現，這種「任務型」commit 的缺點在於一但 commit 變多，開發的功能越來越複雜，你期待從 commit 觀察到的反而不是完成哪些任務，因為這個時候你通常會有個 Project management 的工具幫你追蹤這件事。同時你還會想知道自己在這些 commit 中創造新功能與修復 bug、解決開發債的比例。

### 工作類型 commit

隨後我開始這被我稱為工作類型的 commit，我總共規劃了六種我會時常使用的 commit 工作類型：

- FIX：修復程式問題
- TEST：測試相關
- DOCS：增加 comment、README 等文件時會使用
- FEATURE：新功能！
- STYLE：設計相關
- DEPENDENCY：套件或是其他外部插件

那陣子我的 commit 變成 `[FIX] - duplicated namespace issue` 或是 `[FEATURE] - Add time picker in project` 這樣的好處在於，我可以清楚知道我花多少時間在發布新功能上，尤其是理解新功能開發在每一天佔據的時間。畢竟新創比的都是開發功能的速度，ship fast！這的確成為我那時一大優化的助力。

然而後來我又發現如果這樣做，我不如把兩者合在一起，上層以工作類型做概括的分類，下層則是詳細的任務。變成 `[FIX - Backend optimization] - graphql typing issue` 

隨著時間的演進，前綴我繼續放工作類型，後綴則放任務，最後甚至加上 emoji 讓我在掃視 commit 時能夠一眼知道自己分配工作的方式。` 🎉 feat(new article): the-other-end-of-line-4 工作上的細節` 。

PS: 不要小看 emoji，它作為一種既定的心智模型可以大幅強化你處理資訊的速度。

### 生產力

為了提高我的生產力，我設置了 VScode keyboard shortcut 讓我不用再重複打 git commit。

- `cmd + shift + p` 進入 Command palette
- Preference: Open Keyboard Shortcuts (JSON)
- 複製貼上並調整下列 JSON 檔

```json
[
  {
    "key": "shift+alt+m",
    "command": "workbench.action.terminal.sendSequence",
    "args": { "text": "git commit -m '🎉 feat():'" }
  },
  {
    "key": "shift+alt+x",
    "command": "workbench.action.terminal.sendSequence",
    "args": { "text": "git commit -m '🔧 fix():'" }
  },
  {
    "key": "shift+alt+t",
    "command": "workbench.action.terminal.sendSequence",
    "args": { "text": "git commit -m '🔬 test():'" }
  },
  {
    "key": "shift+alt+d",
    "command": "workbench.action.terminal.sendSequence",
    "args": { "text": "git commit -m '📃 docs():'" }
  },
  {
    "key": "shift+alt+s",
    "command": "workbench.action.terminal.sendSequence",
    "args": { "text": "git commit -m '🎨 style():'" }
  },
  {
    "key": "shift+alt+p",
    "command": "workbench.action.terminal.sendSequence",
    "args": { "text": "git commit -m '📦 dependency():'" }
  }
]
```

### 參考資料

- [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
- [vscode send text via key-binding](https://code.visualstudio.com/docs/editor/integrated-terminal#_send-text-via-a-keybinding)
- [gitemoji - An emoji guide for your commit messages](https://gitmoji.dev/)
- [📙 Emojipedia — 😃 Home of Emoji Meanings 💁👌🎍😍](https://emojipedia.org/)