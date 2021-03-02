

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
   4. 将 `config/prod.env` 中路径改为正式版
   5. 更改 `install.nsh`  'szlims_winapp'
2. 测试版
   1. 将 `package.json` 内的 `appId` 改为 `org.simulatedgregTest.electron-vue`
   2. 将 `package.json` 内的 `productName` 改动
   3. 将 `package.json` 内的 `name` 改为 `szlims-winapp_test`
   4. 将 `config/prod.env` 中路径改为测试版
   5. 更改 `install.nsh`  'szlims_winapp_test'
