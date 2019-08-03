
import { add, count } from './module1'; // 模块路径规则和commonjs一样
import sum from './module2';

// 通过引入的方式，使webpack解析less资源。 当然webpack解析不了，所以报错。
// 需要借助loader来帮助webpack解析
import '../less/test1.less';
import '../less/test2.less';

console.log(add(1, 2));
console.log(count(3, 8));
console.log(sum(1, 2, 3, 4));

