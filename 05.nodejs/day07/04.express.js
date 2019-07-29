const express = require('express');
const { resolve } = require('path');

const app = express();

app.use(express.static(resolve(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/test', (req, res) => {
  console.log(req.query); // { username: 'jack', password: '123' }

  // 允许所有地址进行跨域访问
  res.set('Access-Control-Allow-Origin', '*');

  const data = {
    name: 'rose',
    age: 20
  };

  res.send(data);
});

app.post('/test', (req, res) => {
  console.log(req.body); // { username: 'rose', password: '456' }

  console.log(req.hostname);

  /*
    解决跨域方案：
      CORS： 官方推出的解决方案。
        特点：
          1. 能处理所有请求（method请求方式）
          2. 兼容性稍差（http协议来规定，老版本浏览器不认识）
   */

  const safeUrl = ['http://localhost:63342', 'http://localhost:4000', 'http://localhost:5000'];
  const result = safeUrl.find((url) => url.includes(req.hostname));
  console.log(result);

  if (result) {
    // 允许所有地址进行跨域访问
    // res.set('Access-Control-Allow-Origin', '*');
    // 允许单个地址进行跨域访问
    res.set('Access-Control-Allow-Origin', result);
    // res.set('Access-Control-Allow-Methods', 'GET');
    // res.set('Access-Control-Allow-Credentials', true);
  }


  const data = {
    name: 'jack',
    age: 18
  };

  res.send(data);
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了~');
});