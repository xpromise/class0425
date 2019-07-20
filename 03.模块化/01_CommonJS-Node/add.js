// 第一个功能
function add(x, y) {
  return x + y;
}
function mul(x, y) {
  return x * y;
}

// 模块内部的内容是私有的，外面使用不了
// 外部要想使用模块内部的私有数据，需要暴露出去
exports.add = add;
exports.mul = mul;

// 以下使用是错误的
/*exports = {
  add,
  mul
}*/

/*module.exports = {
  add,
  mul
}*/

