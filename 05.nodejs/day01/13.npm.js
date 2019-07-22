/*
  npm nodejs的包管理器：
    1. npm init 初始化一个package.json文件，自定义配置
    2. npm init -y 使用默认配置的package.json文件
    3. npm install jquery  / npm i jquery 下载并安装包
      安装到当前目录的node_modules中
      package-lock.json 是一个npm缓存文件，缓存包的下载地址
      自动将包名和版本添加到package.json中生产依赖中
    4. npm i babel -D / npm i babel --save-dev
      和第三个基本一样。不同的是会添加到开发依赖中。
    5. npm i jquery@1.11.1 下载指定版本的包
    6. npm remove jquery 删除包
    7. npm i / npm install 下载并安装当前package.json中所有依赖（生产/开发）


     淘宝镜像：npm config set registry https://registry.npm.taobao.org
 */

// 引入jquery
const $ = require('jquery');
// 使用jquery
console.log($);