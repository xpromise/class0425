/*
  1. 连接mongodb服务器 - 数据库
  2. 创建集合
 */
// 引入mongoose
const mongoose = require('mongoose');
// 1. 连接mongodb服务器 - 数据库
const promise = new Promise((resolve, reject) => {
  mongoose.connect('mongodb://localhost:27017/mongoose_test', { useNewUrlParser: true, useCreateIndex: true });
  mongoose.connection.once('open', (err) => {
    if (err) reject(err);
    else {
      console.log('数据库连接成功~');
      resolve();
    }
  });
});


promise
  .then(() => {
    // 数据库连接成功了~
    // 2. 创建集合
    // 创建约束对象：约束集合中文档字段
    const usersSchema = new mongoose.Schema({
      // 约束条件
      username: {
        type: String,
        unique: true, // 唯一的
        required: true // 必填
      }, // key叫username，value为string类型
      password: {
        type: String,
        required: true
      },
      phone: String,
      hobby: [String], // 数组，数组里面是字符串
      info: mongoose.Schema.Types.Mixed, // 任意数据类型
      createTime: {
        type: Date,
        default: Date.now
      }
    });
    // 创建集合
    const Users = mongoose.model('users', usersSchema);

    // 创建一条文档数据
    const document = new Users({
      username: 'jerry',
      password: 'qwer123',
      phone: '11111111111',
      hobby: [],
      info: '练习2年半的练习生~'
    })
    // 保存文档数据
    document.save();

  })
  .catch((err) => {
    console.log(err);
  });