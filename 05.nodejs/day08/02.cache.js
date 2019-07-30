const express = require('express');
const { createReadStream } = require('fs');
const { resolve } = require('path');

const app = express();

/*
  缓存策略：
    1. 强制缓存
      cache-control: max-age=86400  单位秒  http 1.1
      expires  http 1.0

        from memory cache  来自内存缓存
        from disk cache  来自硬盘缓存

        特点： 不会访问服务器。直接读取浏览器本地缓存

    2. 协商缓存
      请求头：浏览器发送给服务器
        if-none-match (与上一次发送过的etag值一样)
        if-modified-since (与上一次发送过的last-modified值一样)
      响应头：服务器发送给浏览器
        etag  代表文件内容的标识
        last-modified 代表文件最近一次的修改时间

        特点： 一直访问服务器。由服务器告诉浏览器是否读取浏览器本地缓存
          返回 304 就会读取缓存
          返回 新资源 就不读取缓存
 */

// 返回index.html资源
app.get('/', (req, res) => {
  const filepath = resolve(__dirname, 'public', 'index.html');
  const rs = createReadStream(filepath);
  rs.pipe(res);
});

// 返回样式资源
app.get('/css/index.css', (req, res) => {
  console.log('服务器接收到了index.css的请求');
  // 进行强制缓存
  // 设置强制缓存的响应头
  res.set('cache-control', 'max-age=86400');
  const filepath = resolve(__dirname, 'public', 'css/index.css');
  const rs = createReadStream(filepath);
  rs.pipe(res);
});

// 初始化的文件标识和修改时间
let etag = 'etag123';
const lastModified = Date.now();

// 返回js资源
app.get('/js/index.js', (req, res) => {
  console.log('服务器接收到了index.js的请求');
  // 进行协商缓存
  // 获取与etag相关的 if-none-match
  const ifNoneMatch = req.headers['if-none-match'];
  // 获取与last-modified相关的 if-modified-since
  const ifModifiedSince = Date.parse(req.headers['if-modified-since']);

  if (ifNoneMatch) {
    // 优先级高的是etag
    if (ifNoneMatch === etag) {
      // 说明文件没有变化，需要走缓存了
      res.status(304).end();
    } else {
      // 设置强制缓存
      res.set('cache-control', 'max-age=10');
      // 设置协商缓存
      res.set('etag', etag);
      res.set('last-modified', new Date(lastModified).toGMTString());
      // 说明文件变化了，返回新资源
      const filepath = resolve(__dirname, 'public', 'js/index.js');
      const rs = createReadStream(filepath);
      rs.pipe(res);
    }
  } else {
    if (ifModifiedSince === lastModified) {
      // 说明文件没有变化，需要走缓存了
      res.status(304).end();
    } else {
      res.set('cache-control', 'max-age=10');
      // 设置协商缓存
      res.set('etag', etag);
      res.set('last-modified', new Date(lastModified).toGMTString());
      // 说明文件变化了，返回新资源
      const filepath = resolve(__dirname, 'public', 'js/index.js');
      const rs = createReadStream(filepath);
      rs.pipe(res);
    }
  }
});

app.listen(3000, (err) => {
  if (!err) console.log('服务器启动成功了~');
  else console.log(err);
});