# webpack
## 介绍
* 一个模块打包器
* 5个核心概念
  * entry 入口：指定webpack从哪个文件开始打包
  * output 输出：指定webpack打包后的资源输出到哪里去
  * loader 加载器：
    * webpack工具只能识别js、json资源，其他资源默认解析不了。
    * 帮助webpack加载识别不了的资源
  * plugins 插件：
    * 执行任务更加强大的功能
  * mode 模式
    * development 开发
    * production 生产: 多一个压缩js代码
* 功能：
  * 默认webpack就能将ES6的模块化编译成浏览器能识别的语法
  * 注意：没有将ES6的其他语法装换成ES5以下
    
## 使用
* 下载webpack
  * npm i webpack webpack-cli -g 全局安装，在哪里下载都行
  * npm i webpack webpack-cli -D 本地安装到开发依赖，必须在项目根目录安装    
* 指令
  * webpack ./src/js/app.js -o ./build/js/built.js --mode=development    
  * webpack ./src/js/app.js -o ./build/js/built.js --mode=production   
  