/*
  用来操作数据库的模块
 */
const { escape, exec } = require('../db/mysql');

function login(username, password) {
  username = escape(username);
  password = escape(password);

  const sql = `select id from users where username=${username} and password=${password} limit 1;`;
  return exec(sql);
}

function verifyUser(username) {
  username = escape(username);
  const sql = `select username from users where username=${username}`;
  return exec(sql);
}

function register(username, password, phone) {
  username = escape(username);
  password = escape(password);
  phone = escape(phone);

  const sql = `insert into users (username, password, phone) values (${username}, ${password}, ${phone})`;
  return exec(sql);
}

module.exports = {
  login,
  verifyUser,
  register
};