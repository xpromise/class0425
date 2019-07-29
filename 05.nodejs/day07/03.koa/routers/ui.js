const Router = require('koa-router');
const { resolve } = require('path');
const { createReadStream } = require('fs');

const loginCheck = require('../middleware/login-check');

const router = new Router();

// 登录检查
// 中间件: 提取路由中公共逻辑进行封装
// router.use(loginCheck);

// 路由
router.get('/user.html', loginCheck, (ctx) => {
  const filepath = resolve(__dirname, '../views', 'user.html');
  ctx.type = 'html';
  ctx.body = createReadStream(filepath);
});

router.get('/admin.html', (ctx) => {
  const filepath = resolve(__dirname, '../views', 'admin.html');
  ctx.type = 'html';
  ctx.body = createReadStream(filepath);
});

module.exports = router;