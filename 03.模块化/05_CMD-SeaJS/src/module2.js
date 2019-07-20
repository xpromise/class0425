define(function (require, exports, module) {
  // 引入依赖
  const m1 = require('./module1');

  function showMsg() {
    console.log(m1);
  }
  // 暴露
  exports.showMsg = showMsg;
})