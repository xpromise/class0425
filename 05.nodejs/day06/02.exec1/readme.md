1. 新建目录 src/utils 放置工具函数模块
  * parser.js  放置解析请求相关函数
    * getBodyData
    * getCookies
    * getSession
  * logs.js 日志相关的函数

2. 新建目录 bin/www.js 用来启动服务器
  * app.js 放置服务器处理函数  
  * 新建package.json 在 scripts 新建指令 "start": "node ./bin/www.js" --> npm start
  
3. 将 db 移入 src/db  
  * 新建 config/index.js 放置 所有服务器、数据库的配置信息

  
  
  