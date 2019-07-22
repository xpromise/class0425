/*
  1. 打开文件 fs.open(path[, flags[, mode]], callback)
    callback 当文件打开时触发
      err 错误对象（如果有错误，就是错误内容。如果没有错误，值是null）
        错误优先机制。 优先处理错误信息。
      fd 文件描述符
  2. 写入文件 fs.write(fd, buffer[, offset[, length[, position]]], callback)
  3. 关闭文件 fs.close(fd, callback)
 */

const fs = require('fs');

// 1. 打开文件
fs.open('./a.txt', 'r', (err, fd) => {
  if (err) {
    // 处理错误
    console.log(err);
    // 抛异常
  } else {
    console.log('文件打开成功~');
    // 写其他代码
    // 2. 写入文件
    fs.write(fd, Buffer.from('atguigu'), (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('文件写入成功');
      }
      // 不管写入成功还是失败，都要关闭
      // 3. 关闭文件
      fs.close(fd, (err) => {
        if (err) console.log(err);
        else console.log('文件关闭成功');
      })
    });
  }
});

