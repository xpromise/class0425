// import '@babel/polyfill'; // 包含ES6的高级语法的转换
/*import { add, count } from './module1'; // 模块路径规则和commonjs一样
import sum from './module2';*/

import add from './add';
import number from './number';


// 通过引入的方式，使webpack解析less资源。 当然webpack解析不了，所以报错。
// 需要借助loader来帮助webpack解析
import '../less/test1.less';
import '../less/test2.less';
import '../less/iconfont.less';

const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('hello webpack');
  }, 1000)
});

console.log(promise);
// console.log(add(1, 2));
// console.log(count(3, 8));
// console.log(sum(1, 2, 3, 4));

add();
number();

if (module.hot) {
  module.hot.accept('./number', function () {
    document.querySelector('.number').remove();
    number();
  })
}
