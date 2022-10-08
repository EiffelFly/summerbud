---
title: "Hololink - Hololink 的方法論"
slug: "202010-the-methodology-of-hololink"
tags: ["Essays"]
publishedAt: "2020-10-26T18:00:00"
lastModified: "2020-10-26T18:00:00"
description: "Hololink 運用 Basestone 和 Stellar 來處理資訊爆炸的問題。"
featureImg: "/hololink-basestone-stellar.jpeg"
featureImgAlt: "Hololink's basestone and stellar keywork"
featureImgSource: "https://github.com/EiffelFly/hololink-main-frame"
locale: "zh-TW"
---

# Basestone 和 Stellar

---

> 💡 篩選名詞後利用 Name entity recognition 辨識出具特定意義的專有名詞成為 basestone 其餘則為 Stellar

這是 Hololink 的核心方法論，既然如 [Internet as a knowledge-base 及 Information overload](/thoughts/202008-internet-as-a-knowledge-base-and-information-overload) 所談到的，我們需要一種很簡易的方法來組織連結，它必須簡單到單純以單一條 if condition 就可以完成`if 'a' in ['a','b','c','d','e']:` 我們必須找到文章的最基本單位是什麼。

名詞、代詞、動詞、形容詞、副詞、數量詞、虛詞（關係詞、語氣詞），如果我們要找到一個最基本的單位的話，大概會篩選出動詞和名詞，副詞與形容詞都是依附在動詞和名詞上的字詞，至於代詞、數量詞與虛詞因為無法單獨成立更不用論及。

對 Hololink 而言，動詞和名詞都是必須分析的字詞，然而以獨立性而言動詞也難以依靠自身存在；除此之外名詞具有更明確的分類，其演算法的發展也較為完整，故我們目前暫時沒有顧及動詞的分析。

確立好 Hololink 的基礎是名詞後我們將名詞做了兩組分類：Basestone 和 Stellar。


<img 
  src="/hololink-basestone-stellar.jpeg"
  alt="The image of displaying how basestone and stellar work"
/>

Basestone 是專有名詞：團體、設施、組織、地理、地點、商品、事件、藝術品、法律、語言、日期、時間、比例、錢、數量。以及特定領域專有名詞（這個將會隨著時間累積）

Stellar 則是敘述性名詞：例如方法、名詞、分類、標記、實體、功能。諸如此類用以表徵非特定意義的名詞接被包含在 Stellar下。

將名詞篩選出來並且分為此兩種後，我們將單純對兩個所屬的關鍵字進行連結，當前的做法是以文章為主，關鍵字為從進行。這樣的關係圖所表彰的是該複數篇文章聚集起來的特性是什麼。

舉例來說如科技島讀的複數篇文章，縱使方向皆不同還是可以藉由這種方式找到周欽華使用文句的方式及它特別關注的專有名詞是什麼。

Hololink 嘗試先以這種方式建立基礎，幫助使用者建立文章與文章間的連結，依此深化下去。

## 這種關鍵字系統的應用情境

### 類似的 Basestone 但不同的 Stellar

<img 
  src="/hololink-basestone-stellar-collection.jpeg"
  alt="The image of displaying how basestone and stellar collection work"
/>

代表複數篇文章可能以不同的方式闡述同一件事件、事物、組織。當你閱讀這一篇文章時，Hololink 會自動呈現具有這類特質的文章，讓讀者可以輕易索引到不同面向、聲音、價值觀的文章。

這是克服 overconfidence 及 biasing 的其中一個方法 consider the opposite:

> The strategy consists of nothing more than asking oneself, “What are some reasons that my initial judgment might be wrong?” The strategy is effective because it directly counteracts the basic problem of association-based processes — an overly narrow sample of evidence – by expanding the sample and making it more representative...
-[Blackwell Handbook of Judgment and Decision Making](https://books.google.com.tw/books?id=s73eYl1DRHUC&pg=PA323&lpg=PA323&dq=he+strategy+consists+of+nothing+more+than+asking+oneself,+%E2%80%9CWhat+are+some+reasons+that+my+initial+judgment+might+be+wrong?%E2%80%9D&source=bl&ots=nfJymKlggk&sig=ACfU3U2Cl76rJki4EOkcQJHim-7ftMOZog&hl=en&sa=X&ved=2ahUKEwi_j6jIpdHsAhUSVpQKHRsVCXwQ6AEwBXoECAIQAg#v=onepage&q=he%20strategy%20consists%20of%20nothing%20more%20than%20asking%20oneself%2C%20%E2%80%9CWhat%20are%20some%20reasons%20that%20my%20initial%20judgment%20might%20be%20wrong%3F%E2%80%9D&f=false)
> 

Hololink 將從這一個方向出發，找到方法突破 [filter bubble](https://en.wikipedia.org/wiki/Filter_bubble#:~:text=A%20filter%20bubble%20%E2%80%93%20a%20term,as%20location%2C%20past%20click%2Dbehavior)

### 以特定專業場域區分 Basestone 深度與廣度

<img 
  src="/hololink-knowledge-boundary.jpeg"
  alt="The image of displaying the boundary of knowledge"
/>

Hololink 的終極目標為：協助個人辨識出知識的疆界，並且找到突破口。以 Basestone 為主的系統將會幫助我們達到這個目標，每個特定的專有名詞，諸如電腦科學中的：Hypertext Transfer Protocol、Object-Oriented Programming、Artificial Intelligence、Machine learning等等都會被標上「電腦科學」這類標籤。

使用者可以從個人的圖表中篩選出到目前為止閱讀過的電腦科學專有名詞，並且查看這些專有名詞各自連結上多少篇文章，並以此作為對該專有名詞的深入程度的判斷基礎。

最終而言，我們會累積出幾乎涵蓋當前電腦科學領域的專有字詞，這些專有名詞會漂浮在個人知識體系之外等待被發掘，使用者可以直接從 Hololink 中延伸出去探詢這些文章。