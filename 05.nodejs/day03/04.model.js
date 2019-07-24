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
  .then(async () => {
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

    /*
      CRUD
        - C create
          Users.create(文档对象, 回调函数)
        - R read
          Users.find(查询条件, 投影, 回调函数)  返回值一定是数组
          Users.findOne(查询条件, 投影, 回调函数)  找到了是对象，没有找到是null
        - U update
          Users.updateOne(查询条件, 更新内容)
          Users.updateMany(查询条件, 更新内容)
        - D delete
          Users.deleteOne(查询条件)
          Users.deleteMany(查询条件)
     */

    /*Users.create([
      {
        username: 'caixuk111',
        password: '123456',
        hobby: ['篮球'],
        info: '练习3年半',
        phone: '23333333333',
      },
      {
        username: 'caixuk222',
        password: '123456',
        hobby: ['篮球'],
        info: '练习3年半',
        phone: '23333333333',
      },
    ], (err) => {
      if (err) console.log(err);
      else console.log('数据创建成功~');
    })*/
    /*const result = await Users.create({
      username: 'caixuk333',
      password: '123456',
      hobby: ['篮球'],
      info: '练习3年半',
      phone: '23333333333',
    })*/

    // const result = await Users.find({username: /^caixu/});
    // const result = await Users.findOne({username: {$in: ['jack', 'rose']}}, {password: 0, __v: 0});

    // const result = await Users.updateMany({username: /^caixu/}, {$set: {hobby: ['唱', '跳', 'rap', '篮球']}});

    const result = await Users.deleteOne({username: /^caixu/});

    console.log(result);

  })
  .catch((err) => {
    console.log(err);
  });