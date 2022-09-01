---
title: "如何打造自己的 Three.js boilerplate"
slug: "build-your-own-threejs-boilerplate"
tags: ["how-to", "threejs", "webpack", "boilerplate"]
publishedAt: "2021-09-15T12:00:00"
lastModified: "2021-09-15T12:00:00"
description: "近期 3D 的趨勢越來越明顯，我決定從 Three.js 開始學習關於 3D 的事。然而，找了許久都沒有發現適合自己的 boilerplate，我決定自己來做一個！"
locale: "zh-tw"
---

最近深感 3D 的趨勢越來越明顯，Facebook 等大型企業相繼宣告踏足 Metaverse 的建設，未來五年內關於 3D 的創業機會將越來越多。思考一陣子後決定投入時間經營 3D 的能力，並從 Three.js 開始探索（關於為什麼是 Three.js 等我玩一陣子之後再來回顧）。找了許多資源，卻發現網路上的 boilerplate 都沒有很好用，有些需要 git clone，有些使用舊的 Webpack，等等這些資源都不符合我對於 boilerplate 的要求，因此我決定自己來打造一個，條件如下。

1. 與環境低耦合，程式碼可以無縫貼到其他的 production server 上（之後期待使用 next.js 來陳列這些作品）
2. 實驗性高，我了解每個組件的目的，整體架構簡單，拆解方便（未來想放上 TailwindCSS）
4. npx 一鍵安裝

希望你看完這篇文章之後，也能打造自己的 three.js boilerplate

## 資料夾結構

我的資料夾結構如下

- `src` 下放置建構 3D 物件使用到的 JS、HTML、CSS 檔案
- `webpack` 下放置 webpack.config
- `static` 下放置靜態物件如字體、照片

## Dependency 

首先來確定需要安裝的套件

```json
"dependencies": {
	"ansi-colors": "^4.1.1",
	"dat.gui": "^0.7.7",
	"three": "^0.132.2"
},
"devDependencies": {
	"@babel/core": "^7.15.5",
	"@babel/preset-env": "^7.15.6",
	"babel-loader": "^8.2.2",
	"clean-webpack-plugin": "^4.0.0",
	"copy-webpack-plugin": "^9.0.1",
	"css-loader": "^6.2.0",
	"html-loader": "^2.1.2",
	"html-webpack-plugin": "^5.3.2",
	"portfinder-sync": "^0.0.2",
	"style-loader": "^3.2.1",
	"webpack": "^5.52.1",
	"webpack-cli": "^4.8.0",
	"webpack-dev-server": "^4.2.0",
	"webpack-merge": "^5.8.0"
}
```

- Three.js
- dat.gui：開發 3D 物件的時候會將這個套件當作各種參數的控制面板
- webpack：運用 Webpack 來打包套件並且提供 devServer
- webpack-cli：指令碼工具
- webpack-dev-server：devServer!
- webpack-merge：由於我將 `webpack.config.js` 拆成 common, dev, prod 三個檔案，需要使用這個套件來熔接他們
- css-loader、style-loader：CSS loader
- html-loader：HTML loader
- html-webpack-plugin：這個套件有好幾個用處，其一是幫助我們把含有 hash 的 JS 或是 CSS檔案塞入 HTML 之中，另外一個好處則是它可以讓我們服務多個 html template[^1]，達成在 devServer 也可能處理多個 routing 的好處[^2]
- copy-webpack-plugin：幫助我們把 static 資料夾的內容貼進 build dist
- clean-webpack-plugin：在每一次 build 之前都先把 dist folder 清空
- portfinder-sync：透過這個套件讓我們在架設 devServer 不會有 port 衝突的問題
- babel：兼容舊的瀏覽器

## Webpack 設定

```js
// Webpack.common.js

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  
  // 進入點
  entry: path.resolve(__dirname, "../src/three.js"),
  
  // 我們將 bundle 檔輸出到 dist 資料夾
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  
  // 開啟 source-map
  devtool: "source-map",
  plugins: [
    
	// 將 static 資料夾下的資料複製進 dist
	new CopyWebpackPlugin({
	  patterns: [{ from: path.resolve(__dirname, "../static") }],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../src/index.html"),
      minify: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
	  
	  // 以下為 Webpack5 之後才有的寫法
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
```

prod 和 dev 就比較簡單了

```js
// webpack.dev.js

const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.common.js");
const portFinderSync = require("portfinder-sync");
const path = require("path");

module.exports = merge(commonConfiguration, {
  mode: "development",
  devServer: {
    host: "0.0.0.0",
	
	// portFinderSync 會從 port-8080 開始找尋可以使用的 port
    port: portFinderSync.getPort(8080),
	
	// 提示 Webpack 在 static 檔案變動時也要重新整理頁面
    static: {
      directory: path.resolve(__dirname, "static"),
      watch: true,
    },
    https: false,
    allowedHosts: "all",
    client: {
      overlay: true,
    },
  },
});
```

```js
// webpack.prod.js

const { merge } = require("webpack-merge");
const commonConfiguration = require("./webpack.common.js");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(commonConfiguration, {
  mode: "production",
  plugins: [new CleanWebpackPlugin()],
});
```

## HTML、JS 和 CSS

### HTML
Three.js 使用 Canvas，記得加上 class 之後使用 querySelector 選出來。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Threejs starter pack</title>
</head>
<body>
    <canvas class="webgl"></canvas>
</body>
</html>
```

### CSS
設定 `margin: 0; padding: 0` 在於解決 html 預設值造成多餘空白的問題。除此之外，這邊要記得導入 font 的時候 format 不要寫成 `format("ttf")` 而是 `format("truetype")` 以免像我一樣以為 Webpack 設定有問題，debug 許久才找到是因為 format 設定錯誤導致瀏覽器自動忽略這個字體。

```css
* {
  margin: 0;
  padding: 0;
}

@font-face {
  font-family: "Inconsolata";
  src: url("../static/Inconsolata-Light.ttf") format("truetype");
}

html,
body {
  height: 100vh;
  font-family: Inconsolata;
}

.webgl {
  width: 100%;
  height: 100%;
  outline: none;
}

```

### JS
詳細程式碼請參考 [create-threejs-starter-pack](https://github.com/EiffelFly/create-threejs-starter-pack)

```js
import "./style.css";
import * as THREE from "three";
import * as dat from "dat.gui";

...

```

## Webpacl-cli 指令

我們在 package-json 中加入以下指令來指示 webpack-cli 幫我們 devServer 架起來

```
"scripts": {
    "dev": "webpack serve --config ./webpack/webpack.dev.js",
    "build": "webpack --config ./webpack/webpack.prod.js"
},
```

到了這裡你的大紅甜甜圈想必轉起來了，接下來就是使用 npx 來自動化建構新專案的流程啦！自己建 boilerplate 最大的好處莫過於你清楚每一步、每一個組件使用的原因，之後想要加什麼都可以很快，也可以藉這個機會了解 Webpack 的運作方式，一石二鳥呢！



[^1]: [jantimon/html-webpack-plugin#generating-multiple-html-files](https://github.com/jantimon/html-webpack-plugin#generating-multiple-html-files)
[^2]: [PUSHSTATE WITH WEBPACK-DEV-SERVER](https://jaketrent.com/post/pushstate-webpack-dev-server)