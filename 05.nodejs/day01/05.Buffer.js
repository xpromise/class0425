/*
  Buffer： 一个用来存储二进制数据的容器
  特点：
    1. 大小固定
    2. 每个元素大小为1字节 byte
      1 bit 位 只能存一个0或1
      1 byte 字节 = 8 bit 位  'utf-8' 英文字母和标点符号占1字节。中文占三个字节
      1 kb = 1024 byte
      1 mb = 1024 kb
      1 gb = 1024 mb
      1 tb = 1024 gb

  使用：
    1. new Buffer(size) 废弃了
    2. Buffer.alloc()
    3. Buffer.allocUnsafe() 可能包含敏感数据
    4. Buffer.from()  将字符串数据转换二进制存储在buffer中

 */

// const buf = new Buffer(10);
// buf是一个伪数组对象
// const buf = Buffer.alloc(10); // <Buffer 00 00 00 00 00 00 00 00 00 00>
// const buf = Buffer.allocUnsafe(10);  // <Buffer 78 09 c0 9a f7 7f 00 00 8c 2e>

const buf = Buffer.from('尚硅谷');
// buf[0] = 0b1010;
/*
  二进制  00000000 - 11111111
  16进制  00 - ff
 */
// console.log(buf[0]);

console.log(buf);

console.log(buf.toString()); // 将buffer数据转换成字符串

