// 引入http模块
const http = require('http');

const querystring = require('querystring');

// 保存用户数据的容器
const users = [];
/*
  1. 收集请求信息： method url data
  2. 根据请求信息返回相应的响应
 */
// 创建http服务
const server = http.createServer(async (req, res) => {
  // 业务逻辑
  // 获取请求方式
  const { method } = req;
  // 获取请求地址
  const [url, query] = req.url.split('?');
  // 获取请求体参数
  const body = await getBodyData(req);
  // promise.then((body) => {}))
  console.log(body); // username=jack&password=123

  // 默认设置
  res.setHeader('Content-type', 'text/plain;charset=utf8');

  if (method === 'POST') {
    // 判断是否是登录请求
    if (url === '/login') {

    }
    // 判断是否是注册请求
    if (url === '/register') {
      // 验证用户数据
      const { username, password, rePassword, phone } = body;
      if (password !== rePassword) {
        // 返回错误提示
        res.end('两次输入密码不一致，请重新输入');
        return;
      }
      // 用户保存起来
      users.push({username, password, rePassword, phone});
      // 返回注册成功
      res.end('注册成功~');
      return;
    }
  }

  // 统一返回404
  res.writeHead(404, {
    // 'content-type': 'text/plain;charset=utf8'
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