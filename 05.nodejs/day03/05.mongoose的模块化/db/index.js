/*
  连接数据库模块
 */
const mongoose = require('mongoose');

const promise = new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost:27017/mongoose_test', { useNewUrlParser: true, useCreateIndex: true });
  mongoose.connection.once('open', (err) => {
    if (err) {
      reject(err);
    } else {
      console.log('数据库连接成功~');
      resolve();
    }
  })
});

// 暴露出去
module.exports = promise;