
async function notFoundRouter(req, res) {
  // 获取请求地址
  const [url] = req.url.split('?');
  // 统一返回404
  res.writeHead(404, {
    'content-type': 'text/plain;charset=utf8'
  });
  return url + '该资源未找到';
}

module.exports = notFoundRouter;