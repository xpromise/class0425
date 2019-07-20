/*
  模块化都会有一个主要的文件：主文件、入口文件   app.js index.js main.js

  nodejs中的模块化 commonjs
    1. 语法：
      - 暴露模块（将模块内部的内容暴露给其他模块使用）
        exports  exports是module.exports的简写，一个引用
        module.exports
          模块暴露的本质： 模块内部向外暴露的是module.exports指向的值
      - 引入模块（将其他模块的暴露的内容引入，才能使用）
        require(模块路径)
          - 自定义模块
            模块路径必须以 './' 或 '../' 开头，否则报错 cannot find module ‘xxx’
          - 其他模块
            - nodejs核心模块( nodejs自带的模块，不需要下载，安装了nodejs就能使用 )
            - 通过npm下载的模块
            模块路径直接写包名（模块名称），不能加 './' 或 '../' ，否则报错 cannot find module ‘xxx’
          - 可以省略文件后缀名： js / json
          - nodejs只能识别js和json文件，其他文件一旦引入就报错
 */

const http = require('http');

// 负责引入其他模块，使用
// 引入模块，执行模块代码。将模块暴露的内容作为require函数返回值返回
const module1 = require('./add');
const module2 = require('./count');

console.log(module1);
console.log(module2);
console.log(http);

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
