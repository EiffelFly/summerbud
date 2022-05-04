---
title: "如何使用 nodemailer 和 AWS SES 寄送 Email"
slug: "send-email-with-aws-ses-and-nodemailer"
tags: ["how-to", "nodemailer", "AWS-SES", "email"]
publishedAt: "2021-09-10T12:00:00"
lastModified: "2021-09-10T12:00:00"
description: "説 email 是現在人最常使用的協定之一一點都不為過，然而實際施作 email 的寄發卻需要跨越多道關卡，這篇文章嘗試指出其中可以使用的工具與方法，讓你也可以輕鬆寄出自己的 email"
---

## Intro

由於 Email 已經是被廣泛使用的協定，討論到它時往往會認為這是個很簡單的技術，頂多只是把文字檔透過一些中介者來互相傳遞而已。但事實卻不是這樣，在 Email 的世界有許多歷史的包袱、跨載體的限制、多元的服務以及為了防止垃圾信件而設下的道道關卡，這些都讓這個表面上看起來簡單的協定，在實作上異常困難。

在這篇文章，我並不打算討論 SMTP 等協定以及 SPF、DKIM、DMARC 等設定，而是專注在基礎實作上，從 AWS SES 的申請到以 nodemailer 串接 SES SDK。雖然 nodemailer 的官網已經有串接 SES 的範例，但他的 import 方式是用 `let aws = require("@aws-sdk/client-ses");` 轉換成 ES6 import 的時候會出現一點問題。並稍微帶到設計 Email template 需要注意到的事，最後提供一個你也可以參與練習的小小挑戰。

live demo: https://book.summerbud.org

## STACK

- AWS SES (Simple Email Service)：顧名思義，這個服務僅做到一件事，收發電子信。
- Nodemailer：nodejs 生態系的寄送電子信套件

有些人或許會問為什麼要同時使用這兩個工具，AWS SES SDK 不是已經提供寄發的 API？

如果你寄送的信件非常簡單的確可以這樣。SES 提供了兩個與寄送 Email 有關的 API，sendMail、sendRawMail，前後者相差之處在於 sendRawMail 可以自訂 Header 和 MIME Type，最常見的運用為「附帶檔案」、「嵌入行事曆」等等。但是設置上比較困難，NodeMailer 可以幫我們解決這件事，除此之外，由於 AWS SES 寄送的限額比較嚴格，我們難以在短時間寄發大量信件，對此我們可以使用 nodemailer 的 rate-limiting 功能，將超過限額的信件挪移到晚一點再寄。[^1]

## 移出 AWS SES 沙盒模式

所有新辦的帳號，在使用 AWS SES 服務時都會被放入沙盒模式，此舉是為了避免有人利用 SES 服務寄送大量垃圾信件，而身處在沙盒模式裡的帳號會有以下限制：

- 24 小時內只能寄送 200 封信件
- 一秒只能寄送一封信件
- 只能寄給你於 AWS SES console 註冊白名單的網域

為了移除沙盒模式，首先你必須先認證你準備使用來寄信的網域（如果是交給 Route53 託管非常簡單）。這邊唯一要注意的是請從最一開始就使用新版的 console，如果你先使用舊版再跳到新版，會出現一些衝突。

隨後它會請你書寫你未來將會如何使用這個服務，請先確定自己的網域已經被驗證妥當再來回答這些問題：

- Short intro about your service
- How do you plan to build or acquire your mailing list?
- How do you plan to handle bounces and complaints?
- How can recipients opt out of receiving email from you?
- How did you choose the sending rate or sending quota that you specified in this request?

每一題都需要回答，回答過後大約二十四小時內就會收到客服的服務。我個人的經驗是 SES 的客服的回答都是罐頭回覆，只要你沒有註冊網域或是漏了回答以上任何一題一律不給過。所以不要浪費時間跟他來回對話，做好這兩件事就可以了。[^3]

## AWS IAM

為了能順利使用 SES 服務，請於 AWS IAM 創建只有 AWSSESFullAccess 權限的使用者，並且紀錄下 AccessKeyId 和 SecretAccessKey。

## 程式碼

### 設置 AWS SES config（以 ES6 import 為例）

```js
import * as aws from "@aws-sdk/client-ses";

const getSESConfig = (region, sesConfiguration) => {
  const accessKeyId = process.env.MY_AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.MY_AWS_SECRET_ACCESS_KEY;
  const configuration = {
    apiVersion: "2010-12-01",
    accessKeyId,
    secretAccessKey,
    region,
    ...sesConfiguration,
  };

  const ses = new aws.SESClient(configuration);

  return {
    // 這裡要將 aws 帶進來，nodemailer 會使用到裡面的資訊
    SES: { ses, aws },
  };
};
```

### 寄送信件

```js
const sendMail = async (from, to, subject, html) => {
  let transporterSES = nodemailer.createTransport(
    getSESConfig("ap-southeast-1")
  );
  const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    html: html,
  };
  try {
    await transporterSES.sendMail(mailOptions);
    return Promise.resolve("Success");
  } catch (err) {
    return Promise.reject(err);
  }
};
```

## 超過 AWS SES 限額時處理方式

當你每秒寄送的速度以及總量超過 AWS SES 的限額時，寄送會出現錯誤，AWS SES 會拋回 400 - Throttling 的錯誤[^4]，可以用暴力 delay 或是 nodemailer 內建的 SMTP pooled 方法[^5]，由於我寄送的量並不大，只需要使用暴力 delay 就可以完成了。

### 暴力 delay

```js
const delay = async (after) => {
  return new Promise((resolve) => {
    return setTimeout(() => resolve(), after);
  });
};
```

```js
const sendMail = async (from, to, subject, html) => {
  let transporterSES = nodemailer.createTransport(
		getSESConfig('ap-southeast-1')
	);
  const mailOptions = {
		from: from,
		to: to,
    subject: subject,
		html: html,
	};
  try {
    await transporterSES.sendMail(mailOptions);
		return Promise.resolve('Success');
  } catch(err){
    if (
			err.code === 'Throttling' &&
			err.message === 'Maximum sending rate exceeded.'
		) {
			await delay(errorRetryDelay);
			return sendEmail(options);
		} else {
			return Promise.reject(error: err);
		}
  }
}
```

## 潛在的 Bug

`error: InvalidParameterValue: Missing final '@domain'`

解決辦法：檢查 to, from 是不是正確的 email 格式

## 設計 Email 的細節

- 請使用預設字體，不要使用 Web font 服務如 Google Font，目前只有少數閱讀器有支援。[^6]
- 請使用 table 排版，原因在於它的支援最廣泛，同時可以使用 align, valign, bgColor 這些 100% 支援的屬性
- 使用 inline css：style-class 的支援度低
- 不要使用 rowspan，不僅會出現響應式設計的惡夢，更會出現一些奇怪的空格
- 不要使用 background image，支援度低
- 不要使用 JS，支援度低
- 你的 Email 在去除所有照片之後還是好閱讀
- table attribute 使用 `role="prensentation"` 讓瀏覽器知道這個屬性只有視覺上的用意[^7]

[^1]: Nodemailer 的官網解釋得很清楚 [Why not use aws-sdk directly?](https://nodemailer.com/transports/ses/#why-not-use-aws-sdk-directly)
[^2]: [Moving out of the Amazon SES sandbox](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/request-production-access.html)
[^3]: 這篇文章有圖文操作方法 [How to Send Emails With Node.js Using Amazon SES](https://betterprogramming.pub/how-to-send-emails-with-node-js-using-amazon-ses-8ae38f6312e4)
[^4]: [Error codes returned by the Amazon SES API](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/using-ses-api-error-codes.html)
[^5]: [nodemailer - POOLED SMTP](https://nodemailer.com/smtp/pooled/)
[^6]: MailChimp 關於 Typography 的講解很好 [Typography](https://templates.mailchimp.com/design/typography/)
[^7]: [The Difference Between role=”presentation” and aria-hidden=”true”](https://timwright.org/blog/2016/11/19/difference-rolepresentation-aria-hiddentrue/)
