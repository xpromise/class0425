/*
  模块化都会有一个主要的文件：主文件、入口文件   app.js index.js main.js

  nodejs中的模块化 commonjs
    1. 语法：
      - 暴露模块（将模块内部的内容暴露给其他模块使用）
        exports
        module.exports
      - 引入模块（将其他模块的暴露的内容引入，才能使用）
        require(模块路径)

 */

// 负责引入其他模块，使用
// 引入模块，执行模块代码。将模块暴露的内容作为require函数返回值返回
const module1 = require('./add.js');
const module2 = require('./count.js');

console.log(module1);
console.log(module2);

console.log(module1.add(1, 2));
console.log(module1.mul(1, 2));
console.log(module2(1, 2));