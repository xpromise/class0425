/*
  ES6模块化规范：
    1. 引入
      import
    2. 暴露
      export
        统一暴露：适用于暴露模块多项内容
        分别暴露：适用于暴露模块多项内容
        默认暴露：适用于暴露模块一个内容

     ES6模块化 默认 nodejs环境不识别 浏览器环境不识别。
     所以ES6模块化需要进行编译，才能运行。
     1. babel
      能将ES6模块化语法转换成commonjs模块化语法
      能将ES6以上语法转换ES5以及以下的语法（做js兼容性处理）
      - 切换目录
      - 定义配置文件   .babelrc
        {
          "presets": [
            "@babel/preset-env"  // 当Babel运行时会读取的配置文件，以@babel/preset-env环境去解析js代码
          ]
        }
      - 下载
        npm init -y 不能有中文
        npm install --save-dev @babel/core @babel/cli @babel/preset-env
      - 运行
        npx babel ./src -d ./build

     2. browserify
      能将commonjs模块化语法转换成浏览器能识别的语法

      browserify ./build/app.js -o ./dist/app.js
 */

// 引入统一暴露/分别暴露的模块的内容
import { add, count } from './module1';
import { name, age, sex, setName } from './module2';
// 引入默认暴露的模块的内容
import Person from './module3';

console.log(add, count);
console.log(name, age, sex, setName);
console.log(Person);