const http = require('http');

/*
  cookie
    1. 是什么？
      本质上就是存储在浏览器端一个key-value文本
    2. 作用：
      保存一些特定信息： 登录信息。。。
    3. 使用：
      - 设置
        res.setHeader('set-cookie', `username=jack;max-age=${3600*24*7};httpOnly;path=/`);
          username=jack;  key=value;
          max-age=${3600*24*7}; cookie在客户端保存的时间，单位s
          httpOnly; 只能在服务端获取，客户端不能获取（没有设置的可以在客户端通过document.cookie获取）
          path=/ 只在 / 路径和子路径下生效，一般不改
      - 获取/解析
        req.headers.cookie
    4. 缺点：
      - 存储容量小  4kb
      - 传输流量多
      - 安全性较低
  session
    存储在服务端
    存储容量大
    传输流量小。只产生一个cookie
    安全性较高

 */

const server = http.createServer((req, res) => {
  const method = req.method;
  const [url] = req.url.split('?');

  if (method === 'GET') {

    if (url === '/test1') {
      // 测试：设置cookie
      res.setHeader('set-cookie', `username=jack;max-age=${3600*24*7};httpOnly;path=/`);
      res.setHeader('content-type', 'text/plain;charset=utf8');
      // 返回响应
      res.end('这是测试cookie返回的响应~');
    }

    if (url === '/test2') {
      // 获取cookie
      console.log(req.headers.cookie); // Webstorm-ef037c84=6dd4cb30-4200-4430-b5a8-a4ca17524f5d; username=jack
      // 将cookie解析成对象
      /*const cookies = {};
      req.headers.cookie.split(';').forEach((item) => {
        const [key, value] = item.trim().split('=');
        cookies[key] = value;
      });
      console.log(cookies);*/
      const cookies = req.headers.cookie.split(';').reduce((prev, curr) => {
        const [key, value] = curr.trim().split('=');
        prev[key] = value;
        return prev;
      }, {});
      console.log(cookies);

      res.end('这是解析cookie返回响应~');

    }

  }


});

server.listen(4000, (err) => {
  if (err) console.log(err);
  else console.log('服务器启动成功了');
});