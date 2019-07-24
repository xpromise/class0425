const mongoose = require('mongoose');

module.exports = new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost:27017/exec', { useNewUrlParser: true, useCreateIndex: true });
  mongoose.connection.once('open', (err) => {
    if (err) {
      reject(err);
    } else {
      console.log('数据库连接成功了~');
      resolve();
    }
  })
});