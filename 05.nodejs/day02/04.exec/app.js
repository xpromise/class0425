// 引入http模块
const http = require('http');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

/*
  1. 收集请求信息： method url data
  2. 根据请求信息返回相应的响应

  npm i nodemon -g 全局安装，可以作为指令在cmd中使用
    nodemon app.js 会监视指定文件，一旦文件发生变化，会自动重启服务器
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
      const users = await readFile();

      const user = users.find((user) => user.username === username);

      if (user) {
        // 找到了指定用户
        if (user.password === password) {
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
      // 用户保存起来
      // 读取本地存储的数据
      const users = await readFile();
      // 判断用户名是否存在
      const user = users.find((user) => user.username === username);

      if (user) {
        // 找到了
        res.end('用户名已存在');
      } else {
        // 没找到
        const userData = {username, password, phone};
        // 持久化存储用户数据
        users.push(userData);
        // 修改
        writeFile(users);
        // 返回注册成功
        res.end('注册成功~');
      }

      console.log(users);
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

const filepath = path.resolve(__dirname, 'db', 'users.txt');

/**
 * 读取文件的方法
 * @returns {Promise<any>}
 */
function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        // 需要处理一上来没有数据的情况
        // 没有数据要返回一个空数组
        resolve(JSON.parse(data.toString() || '[]'));
      }
    });
  })
}

/**
 * 写入文件的方法
 * @param userData
 * @returns {Promise<any>}
 */
function writeFile(users) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filepath, JSON.stringify(users), (err) => {
      if (err) {
        reject(err);
      } else {
        console.log('用户数据保存成功~');
        resolve();
      }
    });
  })
}

// 监听端口号
server.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了~ 3000');
});