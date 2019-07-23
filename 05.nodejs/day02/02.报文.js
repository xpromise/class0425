/*
  http协议：超文本传输协议，基于TCP/IP协议位于应用层协议。
    协议规定客户端和服务端通信的具体规则，里面的具体内容称为报文
    分类：
      请求报文
      响应报文

    1. 请求报文
      Referer: https://www.baidu.com/ 请求来源的地址： 防盗链、广告计费
      content-type: application/x-www-form-urlencoded  代表使用form表单发送的请求，通常是POST请求
      Connection: keep-alive 保持TCP长连接
      请求参数：
        query string 查询字符串  ?key=value&key=value  --> GET
        body 请求体参数 key=value&key=value  --> POST
    2. 响应报文
      content-type: application/javascript 响应内容的类型
        application/javascript  js文件
        application/json json数据
        application/xml xml数据
        text/css  css文件
        text/html  html文件
        text/plain  纯文本
        image/jpg  图片
        video/mp4 视频
        audio/mp3 音频
      cache-control: max-age=2628000  缓存控制，单位秒
      status 响应状态码
        1xx
          请求还需进一步处理。（请求还未处理成功）
        2xx
          请求处理成功了~  200
        3xx
          请求资源重定向。（请求资源我这没有，去其他地方找）
          301 请求资源重定向到新网址，永久重定向
          302 请求资源重定向到新网址，临时重定向
          304 请求资源重定向到浏览器缓存中
        4xx
          资源找不到  404
        5xx
          服务器内部错误 500



 */