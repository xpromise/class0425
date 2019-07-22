/*
  nodejs的模块化： commonjs

  所有模块默认都包裹了一层函数：
    function (exports, require, module, __filename, __dirname) {}
      exports 用来暴露
      require 用来引入
      module module.exports 用来暴露
      __filename 当前运行文件的绝对路径
      __dirname 当前运行文件的文件夹绝对路径
 */

console.log(arguments.callee.toString());

console.log(__filename); // C:\Users\XiongJian\Desktop\190425\class0425\05.nodejs\day01\02.module.js
console.log(__dirname); // C:\Users\XiongJian\Desktop\190425\class0425\05.nodejs\day01