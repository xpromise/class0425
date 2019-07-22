/*
  fs.readFile(path[, options], callback)
    path 文件路径
    callback
      err
      data 文件的读取的数据
 */

const fs = require('fs');
const path = require('path');

const filename = path.resolve(__dirname, 'b.txt');

fs.readFile(filename, (err, data) => {
  if (err) console.log(err);
  else {
    // 读取方法默认返回都是二进制buffer数据
    console.log(data.toString());
  }
});