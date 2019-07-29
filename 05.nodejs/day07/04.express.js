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
    同源策略：
      1. 协议名
      2. 域名
      3. 端口号
      三者必须完全一致，一旦有一个不一样，就是违背同源策略，就会产生跨域
      结果：导致用户拿不到响应数据

      ajax请求会经过同源策略的检查，所以才有跨域问题
      而 script img link form 等HTML标签，它们不会经过同源策略的检查，就没有跨域问题

    解决跨域方案：
      CORS： 官方推出的解决方案。
        特点：
          1. 能处理所有请求（method请求方式）
          2. 兼容性稍差（http协议来规定，老版本浏览器不认识）
      JSONP: 民间的解决方案
        特点：
          1. 只能处理GET请求
          2. 兼容性极好
   */

  const safeUrl = ['http://localhost:63342', 'http://localhost:4000', 'http://localhost:5000'];
  const result = safeUrl.find((url) => url.includes(req.hostname));
  console.log(result);

  if (result) {
    // 允许所有地址进行跨域访问
    // res.set('Access-Control-Allow-Origin', '*');
    // 允许单个地址进行跨域访问
    res.set('Access-Control-Allow-Origin', result);
    // res.set('Access-Control-Allow-Methods', 'GET, POST, HEAD, PUT');
    // res.set('Access-Control-Allow-Credentials', true);
  }


  const data = {
    name: 'jack',
    age: 18
  };

  res.send(data);
});

app.get('/jsonp', (req, res) => {
  // getData
  const { callback } = req.query;

  const data = {
    name: 'tom',
    age: 30
  };

  // 返回响应
  res.send(`${callback}(${JSON.stringify(data)})`); //  'getData({"name": "tom", "age": 30})'
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了~');
});