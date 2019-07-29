const express = require('express');
const { resolve } = require('path');

const loginCheck = require('../middleware/login-check');

const router = new express.Router();

// 登录检查
// 中间件: 提取路由中公共逻辑进行封装
// router.use(loginCheck);

// 路由
router.get('/user.html', loginCheck, (req, res) => {
  /*// 进行登录验证
  if (req.session.userId) {
    // 说明用户登录成功过
    res.sendFile(resolve(__dirname, '../views', 'user.html'));
  } else {
    // 说明用户没有登录成功过, 去登陆页面
    res.redirect('http://localhost:3000/login.html');
  }*/
  console.log(a);
  res.sendFile(resolve(__dirname, '../views', 'user.html'));
});

router.get('/admin.html', (req, res) => {
  res.sendFile(resolve(__dirname, '../views', 'admin.html'));
});

module.exports = router;