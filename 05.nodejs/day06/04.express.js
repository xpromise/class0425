// 引入express
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// 创建app应用对象
const app = express();

// 解析请求体参数
// 通过data事件接收到所有参数，解析成对象，将其挂载到req.body
app.use(express.urlencoded({extended: true}));
// 解析cookie
app.use(cookieParser());
// 使用session  http://www.expressjs.com.cn/en/resources/middleware/session.html
app.use(session({
  cookie: { // 设置session产生cookie
    maxAge: 3600 * 24 * 7,
    httpOnly: true,
    path: '/'
  },
  secret: 'clAsS0425 #%!QSEQ!',  // 参与session_id加密
  resave: false,  // 不会强制保存。需要保存内容才会存session，不保存内容不存session
  // saveUninitialized: true, // 强制保存到数据库中。。
}));

// 设置路由处理请求
app.get('/test1', (req, res) => {
  // 当请求方式为get，并且请求地址为/test1，就会触发当前回调函数
  // 获取请求的参数：查询字符串
  console.log(req.query); // { username: 'jack', password: '123' }
  // 解析cookie
  console.log(req.cookies);
  // 返回响应
  // res.end('success');
  res.send('这是服务器返回的响应~');
});

app.post('/test2', (req, res) => {
  // 获取请求的参数： 请求体参数
  // 默认不解析，引入一个中间件解析
  console.log(req.body); // { username: 'jack', password: '123' }

  res.send('这是服务器返回的响应~');
});


// 监听端口号
app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了~');
});