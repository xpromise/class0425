const { createReadStream } = require('fs');
const { resolve } = require('path');

// 定义公共路径
const publicPath = resolve(__dirname, '../../public');

async function uiRouter(req, res) {
  // 获取请求地址
  const [url] = req.url.split('?');

  if (req.method === 'GET') {
    res.setHeader('Content-type', 'text/html;charset=utf8');

    if (url === '/login.html') {
      // 返回login.html文件
      const filepath = resolve(publicPath, 'login.html');
      return createReadStream(filepath);
    }
    if (url === '/register.html') {
      // 返回register.html文件
      const filepath = resolve(publicPath, 'register.html');
      return createReadStream(filepath);
    }

    if (url === '/user.html') {
      // 判断用户是否登录过
      if (!req.session.id) {
        // 说明用户没有登录过，返回登录页面
        res.writeHead(302, {
          location: 'http://localhost:3000/login.html'
        });
        return 'redirect to http://localhost:3000/login.html';
      }
      const filepath = resolve(publicPath, 'user.html');
      return createReadStream(filepath);
    }
  }
}

module.exports = uiRouter;