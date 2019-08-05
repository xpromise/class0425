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

* webpack配置文件
  * webpack.config.js 位置在项目更目录下  

## 指令
* webpack
  * 能够输出打包后代码
* webpack-dev-server
  * 在内存中编译运行，不会输出
  * 需要通过：npx webpack-dev-server 运行
  * 或者通过在 package.json 配置： "start": "webpack-dev-server" --> 然后通过 npm start 启动  
* webpack --config ./config/webpack.dev.js
  * 修改配置文件名称时，需要设置改动后的地址和名称  
* 注意：以上指令都需要来到项目根目录进行操作  
  
## 代码优化
* tree shaking  术语  
  * 去除多余（未引用代码）的代码
  * 要求：
    * 必须使用ES6模块化
    * 开启webpack production，自动进行tree shaking
  * package.json配置
    "sideEffects": [
      "./src/less/*.less"  // 哪些代码不进行tree shaking
    ],
* code splitting 代码分割    
  * 将一个文件拆分成多个文件
    * 并行加载速度更快
    * 当一个文件变化只要重新加载一个文件
    * 提取成单独文件还可以实现异步动态加载
* 缓存
  * contenthash
* lazy loading 懒加载
  * 首先实现代码分离
  * import() 动态加载      
* shimming
  * 用来定义全局变量  
* pwa
  * 渐进式网络应用
  * 实现离线可访问  
    