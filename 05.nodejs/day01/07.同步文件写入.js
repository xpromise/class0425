/*
  fs - file system
    作用： 用来操作计算机文件
    - 同步文件写入
      打开文件  fs.openSync(path[, flags, mode])
        path 文件路径
        flags 要对文件进行的操作，可选值，一定有默认值 'r'  'w'  'a'
        mode 设置文件的操作权限，可选值, 0o666 可读可写
          0o111 代表文件可执行
          0o222 代表文件可读取
          0o444 代表文件可写入
        返回值是 fd

      写入内容 fs.writeSync(fd, string[, position[, encoding]])
        fd 文件描述符
        string 要写入的内容
        position 要从文件的哪个位置开始写入 '0'
        encoding 写入的编码方式 'utf-8'

        返回值 写入内容的字节长度
      关闭文件 fs.closeSync(fd)
 */

// 引入依赖
const fs = require('fs');

// 同步文件写入
// 1. 打开文件
const fd = fs.openSync('./a.js', 'a', 0o666);
console.log(fd);

// 2. 写入文件内容
const result = fs.writeSync(fd, '今天天气真晴朗111~', 0, 'utf-8');
console.log(result);

// 3. 关闭文件
const res = fs.closeSync(fd);
console.log(res);
