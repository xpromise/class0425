const loaderUtils = require('loader-utils');

// 同步loader
/*module.exports = function (source) {
  // console.log(source); // 匹配上的js文件的具体内容
  // console.log(this.query); // 就是loader上的options

  const options = (0, loaderUtils.getOptions)(this) || {};
  console.log(options);

  const content = source.replace('Jack', options.name || 'peihua');
  // return source.replace('Jack', options.name || 'peihua'); // 只能返回一个值
  this.callback(null, content); // 可以返回多个值，sourcemap
};*/

// 异步loader
module.exports = function (source) {
  // console.log(source); // 匹配上的js文件的具体内容
  // console.log(this.query); // 就是loader上的options
  const options = (0, loaderUtils.getOptions)(this) || {};
  const callback = this.async(); // 知道是一个异步方法，所以会等

  setTimeout(() => {
    const content = source.replace('Jack', options.name || 'peihua');
    callback(null, content); // 调用callback，就不等了
  }, 0)
};