const express = require('express');
// const { resolve } = require('path');
const { escape, exec } = require('./db/mysql');

const app = express();
// 向外暴露静态资源。 public文件夹下所有内容都向外暴露了
app.use(express.static('public'));
// 使用中间件，解析body数据
app.use(express.urlencoded({extended: true}));

// 设置路由
/*app.get('/login.html', (req, res) => {
  // 返回登录页面
  const filePath = resolve(__dirname, 'public', 'login.html');
  // 发送文件
  res.sendFile(filePath);
});

app.get('/register.html', (req, res) => {
  // 返回注册页面
  const filePath = resolve(__dirname, 'public', 'register.html');
  // 发送文件
  res.sendFile(filePath);
});

app.get('/user.html', (req, res) => {
  // 返回用户中心页面
  const filePath = resolve(__dirname, 'public', 'user.html');
  // 发送文件
  res.sendFile(filePath);
});*/

app.post('/register', async (req, res) => {
  // 1. 获取请求体参数
  let { username, password, phone } = req.body;
  // 2. 去MySQL数据库中查找用户名是否存在
  username = escape(username);
  password = escape(password);
  phone = escape(phone);

  const sql = `select username from users where username=${username} limit 1`;
  const result = await exec(sql);

  if (result.length) {
    // 3. 如果存在，返回错误
    res.send('用户名已存在');
  } else {
    // 4. 如果不存在，才能注册用户。此时去MySQL数据库中保存用户数据，并返回登录成功
    const sql = `insert into users (username, password, phone) values (${username}, ${password}, ${phone})`;
    exec(sql);
    res.send('注册成功~');
  }
});

// 监听端口号
app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了~');
});
