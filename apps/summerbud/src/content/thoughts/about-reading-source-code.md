---
title: "My problem about telling others to blindly read source code"
slug: "about-reading-source-code"
tags: ["Essays"]
publishedAt: "2023-09-22T18:00:00"
lastModified: "2023-09-22T18:00:00"
description: "My think blindly telling new programmer to read source code is irresponsible. To read source code, you need to have goal in mind."
featureImg: "/1889-a-birds-eye-view.jpg"
featureImgAlt: "A Bird's-Eye View, 1889, Theodore Robinson"
featureImgSource: "https://www.metmuseum.org/art/collection/search/11934"
locale: "en-US"
---

“You should read the famous repo’s source code. Just read them, you will grow” I keep hitting this suggestion lately and it’s bothering me.

My problem with this suggestion is without any goal in mind, blindly reading source code won’t help and will even cause harm. You need to have a goal in mind to make the magic work. Like “Hey, I want to learn about how to get the header using remark”. For this question, I found out Astro.js has an `Astro.glob` function, the returns have a getHeadings function. How about I dig inside this function to see how it works?

Another example. Recently, I needed to implement an Auth-Guard middleware, I immediately remembered that Auth0 provided a similar function. So I go to their repo to see how it can help me to implement my middleware and it is indeed very helpful.

To me, the better version of this suggestion would be “When you encounter services that have good quality and open-source, list it down but read their source code when you need them”.