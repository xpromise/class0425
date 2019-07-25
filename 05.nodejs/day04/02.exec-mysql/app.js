// 引入http模块
const http = require('http');
const querystring = require('querystring');
const fs = require('fs');

const path = require('path');
// 对象的解构赋值
const { exec } = require('./db/mysql');

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
  // console.log(body); // username=jack&password=123
  // 默认设置
  res.setHeader('Content-type', 'text/plain;charset=utf8');

  if (method === 'POST') {
    // 判断是否是登录请求
    if (url === '/login') {
      /*
        判断用户名是否存在， 判断密码是否正确
          1. 用户名错误就返回用户名找不到，密码错误就返回密码错误
          2. 用户名或密码错误，返回用户名或密码错误
       */
      const { username, password } = body;
      // 找到指定用户
      const sql = `select username, password from users where username='${username}' limit 1`;
      const result = await exec(sql);

      if (result.length) {
        // 找到了指定用户
        if (result[0].password === password) {
          // 登录成功
          res.end('登录成功');
        } else {
          res.end('密码错误');
        }
      } else {
        res.end('用户名找不到');
      }

      return;
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
      // 判断用户名是否存在
      const sql = `select username from users where username='${username}'`;
      const result = await exec(sql);
      console.log(result); // [{}]  / []

      if (result.length) {
        // 找到了
        res.end('用户名已存在');
      } else {
        // 没找到
        // 将数据添加到数据库中
        const sql = `insert into users (username, password, phone) values ('${username}', '${password}', '${phone}')`;

        exec(sql);
        // 返回注册成功
        res.end('注册成功~');
      }

      return;
    }
  }

  // 统一返回404
  res.writeHead(404, {
    // 'content-type': 'text/plain;charset=utf8'
  });
  res.end(url + '该资源未找到');

});
// 监听端口号
server.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了~ 3000');
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


