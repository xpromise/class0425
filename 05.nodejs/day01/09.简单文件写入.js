/*
  简单写入文件  fs.writeFile(file, data[, options], callback)
    file 要写入文件完整路径
    data 要写入内容
    options 配置对象（属性名固定的对象）
    callback
 */

const fs = require('fs');
const path = require('path');

const filepath = path.resolve(__dirname, 'b.txt');
console.log(filepath);

fs.writeFile(filepath, '今天天气真好~', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('文件写入成功~');
  }
})