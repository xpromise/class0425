const { set } = require('../db/redis');

const { login, verifyUser, register } = require('../controller/user');

async function userRouter(req, res) {
  // 获取请求地址
  const [url] = req.url.split('?');

  if (req.method === 'POST') {
    res.setHeader('Content-type', 'text/plain;charset=utf8');

    // 判断是否是登录请求
    if (url === '/login') {
      /*
        判断用户名是否存在， 判断密码是否正确
          1. 用户名错误就返回用户名找不到，密码错误就返回密码错误
          2. 用户名或密码错误，返回用户名或密码错误
       */
      let { username, password } = req.body;

      const result = await login(username, password);

      try {

        if (result.length) {
          // 将用户数据添加到session对象
          // 存储在redis里面
          req.session.id = result[0].id;
          set(req.sessionId, req.session);

          // 重定向
          res.writeHead(302, {
            'location': 'http://localhost:3000/user.html', // 重定向的网址
            'set-cookie': `session_id=${req.sessionId};max-age=${3600*24*7};httpOnly` // 设置cookie
          });
          // 找到了指定用户
          return 'redirect to http://localhost:3000/user.html';
        } else {
          return '用户名或密码错误';
        }

      } catch (error) {
        // 处理错误
        console.log(error);
        return '用户名或密码错误 sql注入';
      }
    }
    // 判断是否是注册请求
    if (url === '/register') {

      // 验证用户数据
      const { username, password, rePassword, phone } = req.body;
      if (password !== rePassword) {
        // 返回错误提示
        return '两次输入密码不一致，请重新输入';
      }

      const result = await verifyUser(username);

      if (result.length) {
        // 找到了
        return '用户名已存在';
      } else {
        // 没找到
        // 将数据添加到数据库中
        register(username, password, phone);
        // 返回注册成功
        return '注册成功~';
      }

    }
  }

}

module.exports = userRouter;