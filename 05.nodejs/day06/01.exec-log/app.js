// 引入http模块
const http = require('http');
const querystring = require('querystring');
const { readFile, createReadStream, createWriteStream } = require('fs');
const { resolve } = require('path');
// 对象的解构赋值
const { exec, escape } = require('./db/mysql');
const { get, set } = require('./db/redis');

// 创建http服务
const server = http.createServer(async (req, res) => {
  // 业务逻辑
  // 获取请求方式
  const { method } = req;
  // 获取请求地址
  const [url, query] = req.url.split('?');
  // 获取请求体参数
  await getBodyData(req);
  // 获取cookie
  getCookies(req);

  // 记录访问日志
  if (url !== '/favicon.ico') {
    access(`${method} -- ${url} -- ${req.headers["user-agent"]} -- ${Date.now()}`);
  }

  let sessionId = req.cookies.session_id;
  let session_data = {};

  if (sessionId) {
    // 读取redis中保存的session数据
    session_data = await get(sessionId);
  } else {
    // 没有session_id， 创建一个session_id
    sessionId = `${Math.random()}_${Date.now()}`;
  }
  req.session = session_data;

  if (method === 'POST') {
    res.setHeader('Content-type', 'text/plain;charset=utf8');

    // 判断是否是登录请求
    if (url === '/login') {

      /*
        判断用户名是否存在， 判断密码是否正确
          1. 用户名错误就返回用户名找不到，密码错误就返回密码错误
          2. 用户名或密码错误，返回用户名或密码错误
       */
      let { username, password } = req.body;
      username = escape(username);
      password = escape(password);

      try {
        // 放置可能出错代码。一旦出错了，try中就终止运行，跳转到catch中执行
        // 找到指定用户
        // 现在去掉引号，因为防止sql注入，会将引号转义
        const sql = `select id from users where username=${username} and password=${password} limit 1;`;
        // console.log(sql); // select username, password from users where username='jack'-- ' ' and password='' limit 1

        const result = await exec(sql);

        if (result.length) {
          // 将用户数据添加到session对象
          // 存储在redis里面
          req.session.id = result[0].id;
          set(sessionId, req.session);

          // 重定向
          res.writeHead(302, {
            'location': 'http://localhost:3001/user.html', // 重定向的网址
            'set-cookie': `session_id=${sessionId};max-age=${3600*24*7};httpOnly` // 设置cookie
          });
          // 找到了指定用户
          res.end();
        } else {
          res.end('用户名或密码错误');
        }
      } catch (error) {
        // 处理错误
        console.log(error);
        // sql语法
        res.end('用户名或密码错误 sql注入');
      }

      return;
    }
    // 判断是否是注册请求
    if (url === '/register') {

      // 验证用户数据
      const { username, password, rePassword, phone } = req.body;
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

  // 通过自己服务器打开页面
  if (method === 'GET') {
    res.setHeader('Content-type', 'text/html;charset=utf8');

    if (url === '/login.html') {
      // 返回login.html文件
      const filepath = resolve(__dirname, './public', 'login.html');
      /*readFile(filepath, (err, data) => {
        if (err) console.log(err);
        else res.end(data);
      })*/
      const rs = createReadStream(filepath);
      rs.pipe(res);

      return;
    }
    if (url === '/register.html') {
      // 返回register.html文件
      const filepath = resolve(__dirname, './public', 'register.html');
      /*readFile(filepath, (err, data) => {
        if (err) console.log(err);
        else res.end(data);
      })*/
      const rs = createReadStream(filepath);
      rs.pipe(res);

      return;
    }
    if (url === '/user.html') {
      // 判断用户是否登录过
      if (!req.session.id) {
        // 说明用户没有登录过，返回登录页面
        res.writeHead(302, {
          location: 'http://localhost:3001/login.html'
        });
        res.end();
        return;
      }
      const filepath = resolve(__dirname, './public', 'user.html');
      const rs = createReadStream(filepath);
      rs.pipe(res);

      return;
    }

  }

  // 统一返回404
  res.writeHead(404, {
    'content-type': 'text/plain;charset=utf8'
  });
  res.end(url + '该资源未找到');

});
// 监听端口号
server.listen(3001, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了~ 3001');
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
      req.body = querystring.parse(body);
      resolve();
    })
  })
}

/**
 * 解析cookie
 * @param req
 * @returns {{}}
 */
function getCookies(req) {
  const cookie = req.headers.cookie;
  if (!cookie) {
    req.cookies = {};
    return;
  }
  req.cookies = cookie.split(';').reduce((prev, curr) => {
    const [key, value] = curr.trim().split('=');
    prev[key] = value;
    return prev;
  }, {})
}

// 写日志
const filepath = resolve(__dirname, 'logs', 'access.log');
const ws = createWriteStream(filepath, {
  flags: 'a'  // 追加
});
function access(log) {
  ws.write(log + '\n');
}


