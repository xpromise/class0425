/*
  所有服务器和数据库的配置
 */

const MYSQL_CONFIG = {
  port: 3306,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'my_test'
}

const SERVER_CONFIG = {
  port: 3000
}

const REDIS_CONFIG = {
  host: 'localhost',
  port: 6379
}

module.exports = {
  MYSQL_CONFIG,
  SERVER_CONFIG,
  REDIS_CONFIG
}