const Koa = require('koa');

const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const morgan = require('koa-morgan');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const { createWriteStream } = require('fs');
const { resolve } = require('path');

const { REDIS_CONFIG } = require('./config');
const userRouter = require('./routers/user');
const uiRouter = require('./routers/ui');

const app = new Koa();

// 记录访问日志
const accessWriteStream = createWriteStream(resolve(__dirname, './logs', 'access.log'), { flags: 'a' });
app.use(morgan('combined', {
  stream: accessWriteStream
}));

// 记录错误日志
const errorWriteStream = createWriteStream(resolve(__dirname, './logs', 'error.log'), { flags: 'a' });
app.use(morgan('tiny', {
  stream: errorWriteStream,
  skip: function (req, res) { return res.statusCode < 400 }
}));

// 向外暴露静态资源。 public文件夹下所有内容都向外暴露了
app.use(serve('public'));
// 使用中间件，解析body数据
app.use(bodyParser());
// 使用session
app.keys = ['keys'];
app.use(session({
  store: redisStore({
    // localhost:6379
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`,
    // session对象在redis中保存的时间
    ttl: 3600 * 24 * 7
  }),
  cookie: {
    maxAge: 3600 * 24 * 7,
    httpOnly: true
  }
}));

// 使用路由器
app
  .use(userRouter.routes())
  .use(userRouter.allowedMethods())
  .use(uiRouter.routes())
  .use(uiRouter.allowedMethods())

module.exports = app;


