const querystring = require('querystring');
const { get } = require('../db/redis');
/**
 * 获取请求体参数
 * @param req
 * @returns {Promise<any>}
 */
function getBodyData(req) {
  return new Promise((resolve, reject) => {
    // 获取请求体参数
    let body = '';
    req.on('data', (chunk) => {
      // console.log(chunk.toString()); // username=jack&password=123
      body += chunk.toString();
    });
    req.on('end', () => {
      // 当数据全部读取完毕，就会触发当前事件
      req.body = querystring.parse(body);
      resolve();
    })
  })
}

/**
 * 解析cookie
 * @param req
 * @returns {{}}
 */
function getCookies(req) {
  const cookie = req.headers.cookie;
  if (!cookie) {
    req.cookies = {};
    return;
  }
  req.cookies = cookie.split(';').reduce((prev, curr) => {
    const [key, value] = curr.trim().split('=');
    prev[key] = value;
    return prev;
  }, {})
}

/**
 * 解析session
 * @param req
 * @returns {Promise<*>}
 */
async function getSession(req) {
  let sessionId = req.cookies.session_id;
  let session_data = {};

  if (sessionId) {
    // 读取redis中保存的session数据
    session_data = await get(sessionId);
  } else {
    // 没有session_id， 创建一个session_id
    sessionId = `${Math.random()}_${Date.now()}`;
  }
  req.session = session_data;
  req.sessionId = sessionId;
}

// 暴露出去
module.exports = {
  getBodyData,
  getCookies,
  getSession
};