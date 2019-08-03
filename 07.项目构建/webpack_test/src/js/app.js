
import { add, count } from './module1'; // 模块路径规则和commonjs一样
import sum from './module2';

// 通过引入的方式，使webpack解析less资源
// import '../less/test1.less';

console.log(add(1, 2));
console.log(count(3, 8));
console.log(sum(1, 2, 3, 4));

