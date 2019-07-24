/*
  step 2 : 获取需要使用的请求信息
 */
// 引入http模块
const http = require('http');

// 创建http服务
const server = http.createServer(async (req, res) => {
  // 获取请求方式
  const { method } = req; // 等于 const method = req.method;
  // 获取请求地址
  // url --> '/login?username=123' --> 我只需要 /login 部分
  const [url, query] = req.url.split('?'); // 等于 const [url, query] = ['/login', 'username=123']
  // 获取post请求体参数
  const body = await getBodyData(req);

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