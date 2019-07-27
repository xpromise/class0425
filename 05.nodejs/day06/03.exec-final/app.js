const Stream = require('stream');

const { getCookies, getBodyData, getSession } = require('./src/utils/parser');
const { access } = require('./src/utils/logs');

const userRouter = require('./src/routers/user');
const uiRouter = require('./src/routers/ui');
const notFoundRouter = require('./src/routers/not-found');

async function serverHandle(req, res) {
  // 业务逻辑
  // 获取请求方式
  const { method } = req;
  // 获取请求地址
  const [url] = req.url.split('?');
  // 获取请求体参数
  await getBodyData(req);
  // 获取cookie
  getCookies(req);
  // 获取session
  await getSession(req);

  // 记录访问日志
  if (url !== '/favicon.ico') {
    access(`${method} -- ${url} -- ${req.headers["user-agent"]} -- ${Date.now()}`);
  }

  let result = await userRouter(req, res);

  if (result) {
    // 统一返回响应
    res.end(result);
    return;
  }

  result = await uiRouter(req, res);

  if (result) {
    if (typeof result === 'string') {
      res.end(result);
      return;
    }
    // 判断是否是流
    if (result instanceof Stream) {
      result.pipe(res);
      return;
    }
  }

  result = await notFoundRouter(req, res);

  if (result) {
    res.end(result);
  }

}

module.exports = serverHandle;








