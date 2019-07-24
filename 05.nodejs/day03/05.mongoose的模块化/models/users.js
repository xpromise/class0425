/*
  用来创建集合
 */
// 引入mongoose
const mongoose = require('mongoose');
// 创建约束对象
const usersSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
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
// 暴露出去
module.exports = Users;