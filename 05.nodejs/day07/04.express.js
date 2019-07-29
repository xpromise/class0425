const express = require('express');
const { resolve } = require('path');

const app = express();

app.use(express.static(resolve(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));

app.get('/test', (req, res) => {
  console.log(req.query); // { username: 'jack', password: '123' }

  const data = {
    name: 'jack',
    age: 18
  };

  res.send(data);
});

app.post('/test', (req, res) => {
  console.log(req.body); // { username: 'rose', password: '456' }

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