(function (global, factory) {
  // 处理js模块化的
  typeof exports === 'object' && typeof module !== 'undefined'  // 判断是否使用commonjs模块化语法
    ? module.exports = factory() : // 如果是commonjs模块化语法，以commonjs模块化语法暴露模块
    typeof define === 'function' && define.amd // 判断是否是AMD  requirejs
      ? define(factory) : // 如果是就通过ADM方式定义模块
      (global.Promise = factory()); // 既不是commonjs 也不是amd, 直接给 window.Promise
})(this, function () {

  /**
   * 自定义Promise
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
    // 初始化保存成功/失败回调函数的数组
    this.callbacks = [];

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
        // 执行成功的回调函数
        setTimeout(() => {
          _self.callbacks.forEach((fnObj) => fnObj.onFulfilled(value))
        }, 0)
      }
    }
    
    function reject(reason) {
      // promise对象状态只能修改一次
      if (_self.status === 'pending') {
        _self.status = 'rejected';
        _self.data = reason;
        // 执行失败的回调函数
        setTimeout(() => {
          _self.callbacks.forEach((fnObj) => fnObj.onRejected(reason))
        }, 0)
      }
    }
    
  };

  /**
   * then
   * @param onFulfilled 成功回调函数
   * @param onRejected 失败回调函数
   * @returns {null}
   */
  Promise.prototype.then = function (onFulfilled, onRejected) {
    // 返回值的是promise对象，为了链式调用
    let promise = null;
    // promise.then()  --> then方法this就是promise
    const _self = this;

    /*
      1. 上一次成功/失败回调函数返回值是一个普通值，then返回值就是成功状态promise对象，并且内部值就是return的返回值
      2. 上一次成功/失败回调函数返回值是一个promise，then返回值就是这个promise
      3. 上一次成功/失败回调函数方法报错了，then返回值就是失败状态promise对象，并且内部值就是失败的原因
     */
    if (this.status === 'fulfilled') {
      promise = new Promise(function (resolve, reject) {
        // 此时promise状态是成功状态，此时要调用成功的回调函数
        // 应该是异步执行: setTimeout 他不是为了延时，只是借助setTimeout让代码异步执行
        setTimeout(function () {
          try {
            // result就是成功回调函数的返回值
            const result = onFulfilled(_self.data);
            if (result instanceof Promise) {
              // 说明返回值是一个promise
              promise = result;
            } else {
              resolve(result);
            }
          } catch (e) {
            reject(e);
          }
        }, 0)
      })
    } else if (this.status === 'rejected') {
      promise = new Promise(function (resolve, reject) {
        // 此时promise状态是失败状态，此时要调用失败的回调函数
        // 应该是异步执行
        setTimeout(function () {
          try {
            // result就是成功回调函数的返回值
            const result = onRejected(_self.data);
            if (result instanceof Promise) {
              // 说明返回值是一个promise
              promise = result;
            } else {
              resolve(result);
            }
          } catch (e) {
            reject(e);
          }
        }, 0)
      })
    } else {
      // pending 状态 --> 收集then方法的成功/失败的回调函数, 为了给后面调用
      promise = new Promise((resolve, reject) => {
        this.callbacks.push({
          onFulfilled: onFulfilled,
          onRejected: onRejected
        })
      })
    }

    return promise;
  };

  return Promise;
});