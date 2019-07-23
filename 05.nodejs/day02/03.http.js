// 引入http模块
const http = require('http');
// 引入querystring模块: 用来解析查询字符串参数
const querystring = require('querystring');

// 创建服务
const server = http.createServer((request, response) => {
  /*
    request 请求对象： 包含B端发送过来的所有数据
    response 响应对象： 包含S端要返回响应的所有数据
   */
  // 处理请求

  const [url, query] = request.url.split('?');
  // 将query解析成对象
  const data = querystring.parse(query);

  // 请求方式
  const { method } = request;

  if (method === 'GET') {

    if (url === '/favicon.ico') {
      response.end();
      return;
    }

    if (url === '/a') {
      // 返回a资源
      // 设置响应头
      response.setHeader('Content-type', 'text/plain;charset=utf-8');
      // response.setHeader('Content-type', 'text/html;charset=utf-8');
      // response.setHeader('Content-type', 'text/javascript;charset=utf-8');
      // response.setHeader('Content-type', 'application/json;charset=utf-8');
      response.end('这是a数据');
      return;
    }

    if (url === '/b') {
      // 返回b资源
      response.end('bbb');
      return;
    }

    if (url === '/c') {
      // 返回c资源
      response.end('ccc');
      return;
    }

    // 以上条件都没有满足
    response.writeHead(404, {
      'content-type': 'text/plain;charset=utf8'
    });
    // 返回具体响应数据
    response.end('未找到该资源');

  } else if (method === 'POST') {


  } else {
    // 返回一个响应
    // 设置响应状态码 和 响应头
    response.writeHead(404, {
      'content-type': 'text/plain;charset=utf8'
    });
    // 返回具体响应数据
    response.end('该请求方式不支持~');
  }


});

// http://localhost:8080
// 通过服务监听端口号
server.listen(8080, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了~ 8080');
});