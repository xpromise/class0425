const express = require('express');
// 引入连接数据库模块，为了执行模块代码从而连接数据库
require('./db');
const Cities = require('./models/cities');

const app = express();

/*
  // 查找所有省份数据
  db.cities.find({level: 1})
  // 查找广东省所有城市数据
  db.cities.find({province: '44', level: 2})
  // 查找广东省深圳市所有区县数据
  db.cities.find({province: '44', city: '03', level: 3})
 */

app.use((req, res, next) => {
  res.set('access-control-allow-origin', '*');
  next();
});

// 设置路由
// 处理省份路由
app.get('/province', async (req, res) => {
  // 返回省份数据
  /*
    {level: 1} 查询条件
    {name: 1, province: 1, _id: 0} 过滤一些数据  暴露name、province，其他的都过滤掉
   */
  try {
    const result = await Cities.find({level: 1}, {name: 1, province: 1, _id: 0});
    // 返回成功响应
    res.send({
      code: 0,  // 代表请求成功还是失败
      data: result
    });
  } catch (e) {
    // 返回失败的响应
    res.send({
      code: 1,  // 代表请求成功还是失败
      msg: '网络错误，请刷新试试~'
    });
  }
});
// 处理城市路由
app.get('/city', async (req, res) => {
  // 获取参数
  const { province } = req.query;

  try {
    const result = await Cities.find({level: 2, province}, {name: 1, city: 1, _id: 0});
    // 返回成功响应
    res.send({
      code: 0,  // 代表请求成功还是失败
      data: result
    });
  } catch (e) {
    // 返回失败的响应
    res.send({
      code: 1,  // 代表请求成功还是失败
      msg: '网络错误，请刷新试试~'
    });
  }
});
// 处理区县路由
app.get('/county', async (req, res) => {
  // 获取参数
  const { province, city } = req.query;

  try {
    const result = await Cities.find({level: 3, province, city}, {name: 1, county: 1, _id: 0});
    // 返回成功响应
    res.send({
      code: 0,  // 代表请求成功还是失败
      data: result
    });
  } catch (e) {
    // 返回失败的响应
    res.send({
      code: 1,  // 代表请求成功还是失败
      msg: '网络错误，请刷新试试~'
    });
  }
});

app.listen(3000, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了~', 3000);
});
