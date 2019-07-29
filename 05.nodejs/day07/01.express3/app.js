const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const morgan = require('morgan');
const { createWriteStream } = require('fs');
const { resolve } = require('path');

const { REDIS_CONFIG } = require('./config');
const userRouter = require('./routers/user');
const uiRouter = require('./routers/ui');

const app = express();

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
app.use(express.static('public'));
// 使用中间件，解析body数据
app.use(express.urlencoded({extended: true}));
// 使用session
app.use(session({
  store: new RedisStore({
    // localhost:6379
    all: `${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`,
    // session对象在redis中保存的时间
    ttl: 3600 * 24 * 7
  }),
  secret: 'Class0425 HTML ^_^',
  resave: false,
  cookie: {
    maxAge: 3600 * 24 * 7,
    httpOnly: true
  },
  saveUninitialized: true,
}));

// 使用路由器
app.use(userRouter);
app.use(uiRouter);

module.exports = app;


