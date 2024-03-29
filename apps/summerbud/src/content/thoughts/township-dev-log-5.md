---
title: "township 開發日記 #5"
slug: "township-dev-log-5"
tags: ["township", "dev-log", "community"]
publishedAt: "2021-09-05T12:00:00"
lastModified: "2021-09-05T12:00:00"
description: "這篇開發日記記錄了這個月使用者訪談的總結，並且詳細頗析了使我們方向轉折的各個因素，希望讀者能從這篇文章窺看新創的痛苦與甜蜜。"
featureImg: ""
featureImgAlt: ""
featureImgSource: ""
locale: "zh-TW"
---

township 幾乎每個禮拜都有方向的變動，而為了驗證這些假說，每週六日我都在重新整理訪綱。整體訪談的對象也逐漸從內容創造者如何去經營社群、小型興趣團體如何經營，慢慢轉向到我們該如何製作出可以在重要環節幫助社群經營者的工具。

### township week 1
- 產品假說：製作結合非即時對話（如文字訊息）與即時對話（如視訊會議）的優點的載體，以語音訊息為主體，幫助 Podcast 創作者建構與粉絲溝通的私人平台。兼具內容儲存等功能，可以將資料轉化成新的一集的材料。
- 使用者訪談主題：確認 Podcast 創作者當前遭遇最大的問題為「如何與粉絲有著更親近的互動」。
- 結論：Podcast 創作者目前的主要問題在於「如何增加觸及人群、擴展聽眾進而增加收益」，與粉絲互動只要強化 IG、Facebook 的經營即可。

### township week 2
- 產品假說：Podcast 創作者可以從自身的主題出發，打造只屬於自己的堅實粉絲俱樂部，每個禮拜都可以在其中出現，討論與當週 Podcast 相對應的主題。
- 使用者訪談主題：確認 Podcast 創作者有經營這類小社群的意願。
- 結論：訪談了更多 Podcast 主持人後發現這群客眾大多是以斜槓，於有正職的情況下經營節目，沒有時間去經營額外的粉絲團體。

### township week 3
- 產品假說：我們將目標改為「小而精緻」的興趣團體，諸如讀書會或是討論會，一直以來他們都是不被看重的那群人。我們可以開發出專門服務他們需求的軟體。
- 使用者訪談主題：確認這類興趣團體的需求，他們是否願意付費。
- 結論：此類興趣團體有三個問題：徵人（如何找到更多的人願意參加這類社群）、紀錄（如何強化紀錄討論內容）與成就感（如何讓參與者停留多一點時間）。深入挖掘下去發現，由於這類興趣團體很小，幾乎詢問周遭的人是否有意願就可以徵得足夠的人，他們的痛點找不到人，而是找不到正確的人。紀錄部分大多是懷舊情懷，實際取得資料並再利用的比例低。至於成就感則有賴於主持的人，同時需要有內在動力才能維持，是軟體難以著墨之處。

### township week 4
- 產品假說：現在沒有出現任何一款以社群經營為前提的工具組合，我們把約時間、挑地點、活動紀錄、活動紀錄儲存、問卷調查 QA 等工具的最基本內容都包起來，並以社群為主要需求對象打造工具，並且以流程統整，就可以解決經營社群需要使用多種工具的問題。
- 使用者訪談主題：確認人們對於工具四散的現況感到痛苦。
- 結論：不管是哪一個社群，最迫切的問題都在於散播自身的訊息、被更多人看見。縱使我把工具集合在一起形塑成流程，也不一定能跨越轉換門檻。原因有二：我可能無法做出單一工具所擁有的強大，且已被習慣的功能；其二，太多工具需要開發將導致我們無法專精其一，進而做出差異化。其三，單一平台並不是使用者期待的方向。

### township week 5

在這個禮拜我們只進行了兩場訪談，且並沒有針對我們未來的方向以專門的問題去問。在講我們的結論之前，我想先講述我們目前的看法。社群經營的方法論並不為人們普遍得知，這就像是在 YCombinator 創辦之前，諸如 Launch fast, Do thing don't scale 等方法論不為新創圈知悉。社群經營目前也多處於空白狀態，如何從零打造一個具向心力、互動性高、使命感強的社群，目前也只有Bailey Richardson, Kai Elmer Sotto, and Kevin Huynh 《Get together》[^1]有提出系統性的數條指引而已。

同時，人們於社交平台上的互動逐漸從公領域轉往較私人的領域，諸如 Discord、Slack group、Telegram group、Line group 等產品不斷吸引人群、Facebook 宣布要將整個軟體從新聞場域轉型為個人互動的場合，同時不斷測試商業化 group 的方法。例如贊助商貼文[^2]

> Zuckerberg has been pushing a plan to transform Facebook into a group-oriented platform that would transition it from a “town square” of public news feeds into more of a “living room” designed around personal interactions with family and friends. [^3]

我們相信這類半公開、私密的社群將會是未來新的一波潮流，現在還僅只是剛開始而已。藉由這一個月以來的研究與交流，我們發覺有幾個很有趣的可能性。

1. 蒐集活動參與者回饋與 User generated content 的方法論尚未流程化
2. 跨平台的社群佈告欄並不存在
3. 社群經營者最關心的問題有兩個：「我如何了解我的參與者圖像，他們是誰？來自哪裡？希望看到哪一類的文章？」、「我如何吸引更多人來參與我的社群？Community growth hack 是什麼？」

從這些論點出發，我們逐步開發出一種名為「Action-based feedback and content generation」的方法論，他的幾個特質與我們當前於諸多訪談者的論點相互驗證。並且有著非常容易完成的 Minimum viable product。我與我的夥伴最後決定就先以這個方向為主，在開發的過程中如果還有其他疑惑再尋找訪談對象。畢竟一個月的探查時間已經過長，我們需要加速進行開發，早點讓目標客群使用到產品。

Cheers!

[^1]: [Get Together: How to build a community with your people](https://www.amazon.com/Get-Together-build-community-people/dp/1732265194)
[^2]: [Facebook Introduces New Monetization Options For Group Admins To Publish Posts In Partnership With Brands](https://www.digitalinformationworld.com/2020/08/facebook-introduces-new-monetization-options-for-group-admins-to-publish-posts-in-partnership-with-brands.html#)
[^3]: [Facebook says private groups are its future. Some are hubs for misinformation and hate.](https://www.washingtonpost.com/technology/2019/07/05/facebook-says-private-groups-are-its-future-some-are-hubs-misinformation-hate/)