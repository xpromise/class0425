/*
  step 1 : 搭建一个基本服务器
 */
// 引入http模块
const http = require('http');

// 创建http服务
const server = http.createServer(async (req, res) => {

});

// 监听端口号
server.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了~ 3000');
});