/*
  配置文件：
    所有服务器、数据库的配置信息
 */

const MYSQL_CONFIG = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'my_test'
};

const REDIS_CONFIG = {
  port: 6379,
  host: 'localhost'
};

const SERVER_CONFIG = {
  port: 3000
};

module.exports = {
  MYSQL_CONFIG,
  REDIS_CONFIG,
  SERVER_CONFIG
};