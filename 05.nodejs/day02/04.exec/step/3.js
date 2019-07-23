/*
  step 3 : 根据获取的请求信息处理请求。分析不同请求
 */
// 引入http模块
const http = require('http');

// 创建http服务
const server = http.createServer(async (req, res) => {
  // 获取请求方式
  const { method } = req; // 等于 const method = req.method;
  // 获取请求地址
  const [url, query] = req.url.split('?'); // 等于 const [url, query] = ['/login', 'username=123']
  // 获取post请求体参数
  const body = await getBodyData(req);

  // 目前应用只处理POST请求
  if (method === 'POST') {
    // 判断是否是登录请求
    if (url === '/login') {

    }
    // 判断是否是注册请求
    if (url === '/register') {

    }
  }

  // 如果以上都不满足，统一返回404
  res.writeHead(404, {
    'content-type': 'text/plain;charset=utf8'
  });
  res.end(url + '该资源未找到');

});

/**
 * 获取请求体参数
 * @param req
 * @returns {Promise<any>}
 */
function getBodyData(req) {
  return new Promise((resolve, reject) => {
    // 获取请求体参数
    let body = '';
    req.on('data', (chunk) => {
      // console.log(chunk.toString()); // username=jack&password=123
      body += chunk.toString();
    });
    req.on('end', () => {
      // 当数据全部读取完毕，就会触发当前事件
      resolve(querystring.parse(body));
    })
  })
}

// 监听端口号
server.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了~ 3000');
});