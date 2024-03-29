---
title: "如何打造像是 create-react-app 的 npx script （以 create-threejs-starter-pack 為例）"
slug: "build-your-own-npx-script-like-create-react-app"
tags: ["how-to", "npx", "boilerplate"]
publishedAt: "2021-09-19T12:00:00"
lastModified: "2021-09-19T12:00:00"
description: "Npx Script 將大幅提升我們開發、部署的速度，透過 create-threejs-starter-pack 為例，這篇文章解釋了你如何創建自已的 npx script"
featureImg: ""
featureImgAlt: ""
featureImgSource: ""
locale: "zh-TW"
---

上一篇文章 [How to - 打造自己的 Three.js boilerplate](https://www.summerbud.org/zh-TW/how-to/build-your-own-threejs-boilerplate) 講述了如何從零開始用 Webpack 打造自己的 Three.js boilerplate。雖然可以用 git clone 把資料放下來，但那樣還是需要重新安裝套件，重新設定 package.json 和 git，縱使只需十分鐘左右，卻仍不夠自動化。

我持守的心智模型是：一但有重複動作的行為，都要盡可能自動化，這也是為什麼我統一使用相同的 git commit 模板的原因（[Lesson-learned - 創造你自己的 git commit 系統](https://www.summerbud.org/zh-TW/lesson-learned/construct-your-own-git-commit-system)）。以下跟大家分享如何使用 npm 中的 npx command line 來自動化這一系列動作，如此一來我們可以把原本需要十分鐘做完的事情，縮減成一分鐘內就可以自動完成！

> Npx === Speed

## 使用 bin 來執行程式碼
npx 的官方文件中解釋 npx 會使用 local `node_modules/.bin` 或是核心的暫存中的 bin 執行檔。

> Executes `<command>` either from a local `node_modules/.bin`, or from a central cache, installing any packages needed in order for `<command>` to run.[^1]

我們要運用這個特質，在我們的 repo 加入 bin 執行檔，來自動化以下的行為。

1. 建立資料夾
2. 從你的 github-repo 把公版 clone 下來
3. npm install
4. 確定資料結構正確
5. 清理多餘資料

首先在你的 repo 中加入 `<root_folder>/bin/<whatever_you_want>.js` 的檔案，隨後在 package.json 之中加上這幾行資訊。

```json
// package.json

"bin": {
	"create-threejs-starter-pack": "bin/<whatever_you_want>.js"
}
```

## RunCommand

在我們預計執行的指令中，有多個項目需要使用 async await 來處理，因此我們需要預先寫幾個 helper 來幫助我們處理這件事。以下是我們最主要的 helper。[^2]

```js
const exec = util.promisify(require("child_process").exec);
```

為了執行指令，node.js 提供 child_process.exec() 這類方程式，但它需要使用 Error-first style callback function[^3]，會帶來大家非常抗拒的 Callback hell 問題，例如：[^4]

```js
exec('my.bat', (err, stdout, stderr) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(stdout);
});
```

幸好可以使用 Promisify 把這類需要 Callback 的 function 轉化為比較好處理的 Promise 形式。（但要注意 Promisify 只能轉換使用以上這類 Callback 的方程式）然後把它包在 async await 方程式之中，這樣使用上就非常方便了。

```js
const runCmd = async (command) => {
  try {
    const { stdout, stderr } = await exec(command);
    console.log(stdout);
    console.log(stderr);
  } catch(err) {
    return Promise.reject(err)
  }
};
```

## 確認使用者有沒有輸入資料夾名稱

由於我們希望使用者在使用 npx 指令時會預先輸入創建資料夾的名稱，大概會長這樣 `npx create-threejs-starter-pack <folder_name>` 因此需要確認使用者是否有正確輸入這個參數。我們可以使用 `process.argv` 來確認這件事，他總共會給我們三個變數[^5]

1.  process.execPath eg. `/usr/local/bin/node'`
2.  被執行的 js 檔案的路徑
3.  額外輸入的參數列表（也就是我們想要使用者輸入的 folder_name）

有了以上資訊之後，我們可以寫出簡單的判斷式來判斷使用者有沒有正確輸入資料夾名稱。並且於其後創建該資料夾，如果資料夾名稱重複，我們也需要提醒使用者要使用其他名稱。

```js
if (process.argv.length < 3) {
  console.log(c.red.bold("Please name for your threejs project"));
  process.exit(1);
}

const appName = process.argv[2];
const starterPackPath = path.join(process.cwd(), appName);

try {
  fs.mkdirSync(starterPackPath); // 創建資料夾
} catch (err) {
  if (err.code === "EEXIST") { // 存有相同名稱的資料夾
    console.log(c.red.bold(`App name ${appName} already exist`));
  } else {
    console.log(err);
  }
  process.exit(1);
}
```

## 執行我們想要自動化完成的指令

在這個專案中我希望可以完成這幾件事：

1. 從你的 github-repo 把公版 clone 下來
2. npm install
3. 移除 git （讓這個專案重新開始）
4. 確定資料結構正確
5. 清理多餘資料

如果這個 npx 不只是給你自己用的話，我們要留一個乾淨的 package.json 給使用者。

```js
const buildPackageJson = () => {
  const newPackage = {
    name: appName,
    version: "0.1.0",
    scripts: {
      dev: "webpack serve --config ./webpack/webpack.dev.js",
      build: "webpack --config ./webpack/webpack.prod.js",
    },
    dependencies: {
      ...
    },
    devDependencies: {
      ...
    },
  };
  
  // 將資料寫入新的 package.json
  
  fs.writeFileSync( 
    `${process.cwd()}/package.json`,
    JSON.stringify(newPackage, null, 2),
    "utf8"
  );
};
```

接下來就是依序使用 `runCmd` 來自動化我們的流程。

```js
const setup = async () => {
  try {
  
  	// Clone github
    await runCmd(`git clone --depth 1 ${repo} ${appName}`);

  	// 進入該資料夾
    process.chdir(starterPackPath);
  
  	// 安裝套件
    await runCmd("npm install");

    // Remove git link
    await runCmd('npx rimraf ./.git');
	
    // 移除舊的 package.json
    fs.unlinkSync(path.join(starterPackPath, "package.json"));

    // 移除 bin 資料夾
    fs.rm(path.join(starterPackPath, 'bin'), { recursive: true })
    
    // 創建新的 package.json
    buildPackageJson()
    
    // 移除一些指示性的套件，例如這個 command-line color tool
    await runCmd("npm uninstall ansi-colors");
    
    console.log("🎉  You had successfully set up the starter pack")
    console.log("Check README.md for more informations")

  } catch(err){
    console.log(c.red.bold(err))
  }
};
```

## Npm publish

做到這裡只差最後一步就可以擁有自己的 npx script 啦。首先到 npm 申請帳號，申請完之後也不要忘了點擊寄送到你的電子信箱內的確認信，不然到時候 publish 時會收到讓人驚慌的 Forbidden 403 哦。

在 Publish 之前我們需要將 package.json 加上幾個資訊（請參考[^6]）

- main：你的程式主要的 js 進入點
- license
- repository：這個 npm package 程式碼的儲存點
- bugs：回報錯誤之處
- homepage：主要介紹頁面 
- keywords：讓他人搜尋到的關鍵字

一切都設定好之後，`npm login` 登入你的帳號。並且在同一個資料夾下 `npm publish` 發布你的套件！

Voilà

接下來就可以使用 `npx <your_package_name> <folder_name>` 來啟動自己的 APP 啦！



[^1]: [npm/npx: npm package executor](https://github.com/npm/npx#description)
[^2]: [Generate your web-app boilerplate like create-react-app does. - DEV Community](https://dev.to/leopold/generate-your-web-app-boilerplate-like-create-react-app-does-301p)
[^3]: [Realdennis - Promisify 與 Callbackify — 你或許用不到，但了解一下也無妨](https://realdennis.medium.com/promisify-%E8%88%87-callbackify-%E4%BD%A0%E6%88%96%E8%A8%B1%E7%94%A8%E4%B8%8D%E5%88%B0-%E4%BD%86%E4%BA%86%E8%A7%A3%E4%B8%80%E4%B8%8B%E4%B9%9F%E7%84%A1%E5%A6%A8-193d7091c091)
[^4]: node.js 官方文件例子 [Child process | Node.js v16.9.1 Documentation (nodejs.org)](https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback)
[^5]: [Process | Node.js v16.9.1 Documentation (nodejs.org)](https://nodejs.org/docs/latest/api/process.html#process_process_argv)
[^6]: [EiffelFly/create-threejs-starter-pack - package.json](https://github.com/EiffelFly/create-threejs-starter-pack/blob/main/package.json)