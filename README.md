# electron-vue-admin

> An electron-vue project

This is a vue electron admin project base on  [vueAdmin-template](https://github.com/PanJiaChen/vueAdmin-template) , and was generated from [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about this project can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron app for production
npm run build

# lint all JS/Vue component files in `app/src`
npm run lint

# run webpack in production
npm run pack
```
---


## Demo

![](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/electron-login.png)

![](https://github.com/PanJiaChen/PanJiaChen.github.io/blob/master/images/electron-admin.gif)


## Download
Mac: [app release](https://github.com/PanJiaChen/electron-vue-admin/releases/tag/v3.0.0)



"babel-eslint": "^7.2.3",
"eslint": "^4.4.1",
"eslint-friendly-formatter": "^3.0.0",
"eslint-loader": "^1.9.0",
"eslint-plugin-html": "^3.1.1",
"lint": "eslint --ext .js,.vue -f ./node_modules/eslint-friendly-formatter src",
"lint:fix": "eslint --ext .js,.vue -f ./node_modules/eslint-friendly-formatter --fix src",
"postinstall": "npm run lint:fix",


   // "sqlite3": "^4.1.1",




   https://www.narda-sts.com/en/servicesupport/software-updates-and-firmware/srm/#download_11648



   npm install --save-dev electron-rebuild

### 每次运行"npm install"时，也运行这条命令
./node_modules/.bin/electron-rebuild

### 在windows下如果上述命令遇到了问题，尝试这个：
.\node_modules\.bin\electron-rebuild.cmd

### 有指纹验证   
finger 支持Node 32位版本，请将Node 安装32位版本，此电脑已安装nvm，具体切换如下：
1. 以管理员身份运行 cmd
2. nvm list 查看当前版本
3. nvm use 版本号 32
注意：打包命令 `npm run build` 会在dist文件夹下生成main.js文件，请在其他文件生成之前将main.js文件夹下的路径 `C:\\Users\\Administrator\\Desktop\\webApp\\src\\main\\finger\\finger.node` 改为 `.\\finger\\finger.node`（路径一般在main.js最后面）


### 关于打包正式版及测试版
1. 正式版
   1. 将 `package.json` 内的 `appId` 改为 `org.simulatedgreg.electron-vue`
   2. 将 `package.json` 内的 `productName` 改动
   3. 将 `package.json` 内的 `name` 改为 `szlims-winapp`
2. 测试版
   1. 将 `package.json` 内的 `appId` 改为 `org.simulatedgregTest.electron-vue`
   2. 将 `package.json` 内的 `productName` 改动
   3. 将 `package.json` 内的 `name` 改为 `szlims-winapp_test`
