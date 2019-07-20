/*
  commonjs 默认只能在nodejs环境下运行，不能再浏览器平台
    需求：想让commonjs再浏览器平台运行
    解决: 解决借助一个工具： browserify : 能将commonjs模块化语法编译成浏览器能识别的语法
    下载安装： 1. 打开cmd  2. 输入指令 npm i browserify -g
      永久配置淘宝镜像，下载速度就更快 ： npm config set registry https://registry.npm.taobao.org
    使用：
      1. 来到当前文件目录
      2. 输入指令 browserify ./src/index.js -o ./build/built.js
        browserify 入口文件 -o 输出文件
        会自动找入口文件中所有依赖的其他文件，全部引入
 */

// const http = require('http');

// 负责引入其他模块，使用
// 引入模块，执行模块代码。将模块暴露的内容作为require函数返回值返回
const module1 = require('./add');
const module2 = require('./count');

console.log(module1);
console.log(module2);
// console.log(http);

console.log(module1.add(1, 2));
console.log(module1.mul(1, 2));
console.log(module2(1, 2));

// console.log(exports === module.exports); // true

/*var a = {
  b: {}
};

var c = a.b;
// a.b.name = 'jack';
// console.log(c);
// c.name = 'jack';
c = {name: 'jack'};
console.log(a.b);*/
