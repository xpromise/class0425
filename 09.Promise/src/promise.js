(function (global, factory) {
  // 处理js模块化的
  typeof exports === 'object' && typeof module !== 'undefined'  // 判断是否使用commonjs模块化语法
    ? module.exports = factory() : // 如果是commonjs模块化语法，以commonjs模块化语法暴露模块
    typeof define === 'function' && define.amd // 判断是否是AMD  requirejs
      ? define(factory) : // 如果是就通过ADM方式定义模块
      (global.Promise = factory()); // 既不是commonjs 也不是amd, 直接给 window.Promise
})(this, function () {

  /**
   * 
   * @param executor 传入函数，这个函数要立即调用
   * @constructor
   */
  const Promise = function (executor) {

    // 初始化promise对象的状态
    this.status = 'pending';
    // 内部返回值
    this.data = undefined;
    // 缓存this --> promise对象
    const _self = this;

    // 一旦executor报错，就将promise对象状态改为失败状态
    try {
      // 立即调用函数
      executor(resolve, reject);
    } catch (e) {
      // 将promise改为失败状态
      reject(e);
    }

    function resolve(value) {
      // promise对象状态只能修改一次
      if (_self.status === 'pending') {
        _self.status = 'fulfilled';
        _self.data = value;
      }
    }
    
    function reject(reason) {
      if (_self.status === 'pending') {
        _self.status = 'rejected';
        _self.data = reason;
      }
    }
    
  };

  return Promise;
});