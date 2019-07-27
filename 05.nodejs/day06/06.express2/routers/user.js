/*
  通过路由器来实现路由分类管理
 */
const express = require('express');
const { login, register, verifyUser } = require('../controller/user');
// 创建路由器实例对象，可以看做一个小型app应用对象
// 包含app的部分功能（get/post/use...）
const router = new express.Router();

// 登录功能
router.post('/login', async (req, res) => {
  // 1. 获取请求体参数
  let { username, password } = req.body;
  // 2. 去MySQL数据库中查找用户名和密码是否正确
  const result = await login(username, password);

  if (result.length) {
    // 4. 如果正确，登录成功，重定向到user页面
    res.redirect('http://localhost:3000/user.html');
  } else {
    // 3. 如果不正确，返回错误
    res.send('用户名或密码错误');
  }
});

// 注册功能
router.post('/register', async (req, res) => {
  // 1. 获取请求体参数
  let { username, password, phone } = req.body;
  // 2. 去MySQL数据库中查找用户名是否存在
  const result = await verifyUser(username);

  if (result.length) {
    // 3. 如果存在，返回错误
    res.send('用户名已存在');
  } else {
    // 4. 如果不存在，才能注册用户。此时去MySQL数据库中保存用户数据，并返回登录成功
    register(username, password, phone);
    res.send('注册成功~');
  }
});

// 暴露出去
module.exports = router;
