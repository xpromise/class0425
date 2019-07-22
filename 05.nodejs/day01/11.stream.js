/*
  stream 流
 */
const fs = require('fs');
const path = require('path');

// 创建可读流
const rs = fs.createReadStream(path.resolve('C:\\Users\\XiongJian\\Desktop\\简单文件写入.avi'));
// 创建可写流
const ws = fs.createWriteStream(path.resolve(__dirname, 'c.avi'));

/*
// 可读流会自动打开自动关闭
rs.once('open', () => {
  console.log('可读流打开了');
})

ws.once('open', () => {
  console.log('可写流打开了');
})
// 可写流需要手动关闭
rs.once('close', () => {
  console.log('可读流关闭了');
  // 关闭可写流
  ws.end();
})

ws.once('close', () => {
  console.log('可写流关闭了');
})


// 将可读流读取的数据写入到可写流中
// 获取可读流读取的数据
// 绑定data事件
rs.on('data', (chunk) => {
  // chunk 就是读取的一块/一部分数据
  // console.log(chunk.length); // 65536 byte = 64 * 1024 = 64 kb
  // 往可写流中写入数据
  ws.write(chunk);
});
*/

// pipe 管道
rs.pipe(ws);
