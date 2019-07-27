const express = require('express');

const userRouter = require('./routers/user');

const app = express();
// 向外暴露静态资源。 public文件夹下所有内容都向外暴露了
app.use(express.static('public'));
// 使用中间件，解析body数据
app.use(express.urlencoded({extended: true}));
// 使用user路由器
app.use(userRouter);

module.exports = app;


