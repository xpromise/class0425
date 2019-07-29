/*
  通过路由器来实现路由分类管理
 */
const Router = require('koa-router');
const { login, register, verifyUser } = require('../controller/user');
// 创建路由器实例对象，可以看做一个小型app应用对象
// 包含app的部分功能（get/post/use...）
const router = new Router();

// 登录功能
router.post('/login', async (ctx) => {
  // 1. 获取请求体参数
  let { username, password } = ctx.request.body;
  // 2. 去MySQL数据库中查找用户名和密码是否正确
  const result = await login(username, password);
  console.log(result);

  if (result.length) {
    // 4. 如果正确，登录成功，重定向到user页面
    // 将用户数据存储在session中
    ctx.session.userId = result[0].id;
    ctx.redirect('http://localhost:3000/user.html');
  } else {
    // 3. 如果不正确，返回错误
    ctx.body = '用户名或密码错误';
  }
});

// 注册功能
router.post('/register', async (ctx) => {
  // 1. 获取请求体参数
  let { username, password, phone } = ctx.request.body;
  // 2. 去MySQL数据库中查找用户名是否存在
  const result = await verifyUser(username);

  if (result.length) {
    // 3. 如果存在，返回错误
    ctx.body = '用户名已存在';
  } else {
    // 4. 如果不存在，才能注册用户。此时去MySQL数据库中保存用户数据，并返回登录成功
    register(username, password, phone);
    ctx.body = '注册成功~';
  }
});

// 暴露出去
module.exports = router;
