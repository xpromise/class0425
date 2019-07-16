!(function (w) {
  // 1. 可以简写变量
  // 2. 查找变量速度更快，少找一个作用域

  var things = '吃饭 睡觉 打豆豆';

  function doSomething() {
    console.log(things);
  }

  function doOtherThing() {
    console.log(things);
  }

  /*w.doSomething = doSomething;
  w.doOtherThing = doOtherThing;*/

  w.module = {
    doSomething: doSomething,
    doOtherThing: doOtherThing
  }

})(window);
