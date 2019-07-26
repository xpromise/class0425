const redis = require('redis');

// 连接redis
const client = redis.createClient(6379, 'localhost');

// 绑定连接失败的事件
client.on('error', (err) => {
  console.log('redis connect error: ', err);
});

// 添加key-value
client.set('test1', '123456', redis.print);
// 读取key
/*
client.get('test', (err, value) => {
  if (err) console.log(err);
  else console.log(value);
});
*/

console.log(1111);