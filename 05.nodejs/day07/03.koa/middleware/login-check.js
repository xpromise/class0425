

function loginCheck(ctx, next) {
  if (ctx.session.userId) {
    // 说明用户登录成功过
    // 默认路由/中间件值触发一个。想要触发下一个，必须调用next
    // 触发下一个中间件或路由
    next();
  } else {
    // 说明用户没有登录成功过, 去登陆页面
    ctx.redirect('http://localhost:3000/login.html');
  }
}

module.exports = loginCheck;