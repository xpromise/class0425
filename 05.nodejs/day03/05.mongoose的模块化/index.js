/*
  主模块
 */
// 引入其他模块
const db = require('./db');
const Users = require('./models/users');

db
  .then(async () => {
    // 进行数据库操作
    const result = await Users.create({
      username: 'yifan',
      password: '66666666666',
      hobby: ['面', 'rap'],
      info: '你看这面又长又宽',
      age: 30
    });
    console.log(result);
  })
  .catch((err) => {
    console.log(err);
  })



