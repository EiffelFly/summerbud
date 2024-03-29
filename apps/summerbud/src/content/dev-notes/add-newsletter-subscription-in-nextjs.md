---
title: 如何用 Next.js API route + Mailchimp 施作電子信訂閱
slug: "add-newsletter-subscription-in-nextjs"
tags: ["Blog", "Next.js", "Newsletter"]
publishedAt: "2021-07-28T18:00:00"
lastModified: "2021-07-28T18:00:00"
description: "這篇文章將教你如何使用 Mailchimp API 和 Next.js API route 來建構自己的電子信訂閱功能"
locale: "zh-TW"
featureImg: ""
featureImgAlt: ""
featureImgSource: ""
---

## 大綱

1. 設定環境參數
2. 獲得 Mailchimp 重要資料
3. 設立環境參數
4. Subscription form 設計
5. 使用 API route 發送請求
6. 錯誤處理
7. 總結

Next.js 的架構非常有助於我們串接 API 的服務，其中的原因在於它具有在伺服器端預設出 API 端點的功能。透過它我們可以架出類似 AWS Lambda function 的 Serverless function 來乘載實際上請求第三方服務的函式，不僅減少使用者端的運算與 Bundle 大小，更可以運用伺服器端的環境變數來儲藏敏感的資料。

基於介面簡潔，兩千筆訂閱數以內免費、有完善的 API、開發者文件完整等等原因，第三方的電子信管理程式我選擇 Mailchimp。如果你有付費訂閱需求的話，可以考慮 ButtonDown [^1]。

---

## 優勢

- Serverless function 彈性高，隨時可以曝露出來給他人使用，方便串接各方服務
- 減少使用者端運算與 Bundle 大小
- 使用 Vercel deploy 非常省時省力
- 所有函式在同一個 Repo 裡共同管理

---

## 設定環境參數

由於以下資料大多屬於個人機密資料，所以我們需要開環境參數來儲存它。於根目錄處設立 `.env.local`，如果 NEXT 有讀取到，它會於 npm run dev 的 terminal 顯示以下訊息。 `info - Loaded env from <root_folder>/.env.local`

```bash
MAILCHIMP_API_KEY=
MAILCHIMP_API_SERVER=
MAILCHIMP_LIST_ID=
```

如果你是使用 `npx create-next-app` 開局，.gitignore 已經預設有 .env.local。若不是使用 npx 請記得把 .env.local 加入 .gitignore 的清單之中。

---

## 獲得 Mailchimp 重要資料

### API_KEY（secret）

API KEY 務必保密，它與帳密等價，可以調用所有 Mailchimp 的服務[^2]。請把這組密鑰放在 .local.env 裏，並且儲存在伺服器的環境參數之中。

- 取得路徑：Accounct -> Extra -> API leys -> Create new
- 官方文件連結[^2]

### LIST_ID or AUDIENCE_ID

在 Mailchimp 的 Dashboard 中它被稱為 Audience，在 API 的文件之中又被稱為 LIST，有時會讓人搞混，不過你只要知道這代表你的訂閱者清單即可。

- 取得路徑：Audience -> Settings -> Audience name and campaign defaults
- 官方文件連結[^3]

### SERVER_PREFIX

這代表你的伺服器位置，請查看登入 Dashboard 時的 URL。以 `https://us19.admin.mailchimp.com/` 為例，你的 `SERVER_PREFIX = us19`

- 官方文件連結[^4]

---

## 設置 API route

首先安裝 mailchimp 的 SDK `npm install @mailchimp/mailchimp_marketing`。接著建立 `<root_folder>/api/subscribe.js` 的檔案，如此一來 Next.js 會自動幫你在 `https://<domain_name>/api/subscribe` 建構 api 端點。是不是超方便啊。

```js
import mailchimp from '@mailchimp/mailchimp_marketing';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY
  server: process.env.MAILCHIMP_API_SERVER // e.g. us19
});

export default async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  try {
    await mailchimp.lists.addListMember(process.env.MAILCHIMP_LIST_ID, {
      email_address: email,
      status: 'subscribed'
    });

    return res.status(201).json({ error: '' });
  } catch (error) {
    // Error handling 會放在最後一個章節解釋
    if ( error.response.body.title === "Member Exists"){
      return res.status(500).json({ error: "MemberExists" });
    }
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
```

---

## Subscription form 設計

這裡就是你發揮個人特色之處了，我只會大概羅列應該包含的元素。

```js
const SubscriptionForm = () => {
  const emailAddresss = useRef(null);
  const [message, setMessage] = useState("我只會在新內容刊登時寄送信件給您，拒絕垃圾信件。");

  const subscribe = async (e) => {
    e.preventDefault();

    // 1. 我們使用原生 Fetch 請求 api 端點
    const res = await fetch("/api/subscribe", {
      body: JSON.stringify({
        email: emailAddresss.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { error } = await res.json();

    // 2. 錯誤處理（以重複訂閱為例）

    if (error) {
      if (error === "MemberExists") {
        setMessage("這個電子信箱已經訂閱。");
      } else {
        setMessage(error);
      }

      setWarning(true);
      return;
    }

    // 3. 歡迎訊息

    emailAddresss.current.value = "";
    setSuccess(true);
    setMessage("Cheers! 歡迎加入"));
  };

  return (
    <form
      onSubmit={subscribe}
      className="flex flex-col"
    >
      <div>
        訂閱電子信
      </div>
      <div>從我這收到關於文學、網頁開發、文學的 Lesson learned。我經常分享近期閱讀到的好文章或書籍，以及技術相關的訊息。</div>
      <div className="flex flex-col gap-y-4">
        <input
          aria-label="Email for newsletter"
          placeholder="hi@summerbud.org"
          ref={emailAddresss}
          type="email"
        />
        <button
          type="submit"
        >
          訂閱
        </button>
      </div>
      <div>
        {message}
      </div>
    </form>
  );
};
```

## 錯誤處理

Mailchimp API 最常見的錯誤碼為 400[^5], 500。如果今天發生 Error code 400 的錯誤，你需要查看 `error.response.body` 其中會附有該錯誤的訊息。例如下列錯誤訊息即發生於重複訂閱之時。

```
{
    title: 'Member Exists',
    status: 400,
    detail: 'eric525282@gmail.com is already a list member. Use PUT to insert or update list members.',
    instance: '9dd52fa4-9e01-5e62-65fc-1b81f7631f37'
}
```

## 總結

Newsletter 是衡量內容是否被讀者需要的重要指標，希望藉由這篇文章讓大家知道，除了電子信管理的提供商之外，你不需要其他的資源，自己就可以串接電子信的服務。

[^1]: [ButtonDown official site](https://buttondown.email/)
[^2]: [Mailchimp - About API Keys](https://mailchimp.com/help/about-api-keys/)
[^3]: [Mailchimp - Find Your Audience ID](https://mailchimp.com/help/find-audience-id/)
[^4]: [Make your first API call](https://mailchimp.com/developer/marketing/guides/quick-start/#make-your-first-api-call)
[^5]: [Mailchimp - Error documentaion](https://mailchimp.com/developer/marketing/docs/errors/)
