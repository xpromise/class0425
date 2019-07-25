// 引入mysql
const mysql = require('mysql');

// 创建连接对象
const connection = mysql.createConnection({
  host: 'localhost',  // 域名
  user: 'root', // 用户名
  password: 'root', // 密码
  port: '3306', // 端口号
  database: 'my_test' // 数据库
});

// 开始连接
connection.connect((err) => {
  if (err) console.log(err);
  else console.log('数据库连接成功了~');
});

// 进行数据库的操作
// 创建sql语句
const sql = `insert into users (username, password, phone) values ('tom', '123', '13000000000');`;
// 执行sql语句
connection.query(sql, (err, result) => {
  if (err) console.log(err);
  else console.log(result);
});

// 断开链接
connection.end();