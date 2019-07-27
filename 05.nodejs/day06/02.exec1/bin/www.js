/*
  启动服务器
 */
const http = require('http');
const serverHandle = require('../app');
const { SERVER_CONFIG } = require('../config');

const server = http.createServer(serverHandle);

server.listen(SERVER_CONFIG.port, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了~' + SERVER_CONFIG.port);
});