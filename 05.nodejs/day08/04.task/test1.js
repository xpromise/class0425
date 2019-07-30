// 请说说以下代码的执行顺序
const promise = new Promise((resolve, reject) => {
  console.log('promise执行了~');
  reject(true);
});

promise
  .then(() => {
    console.log('then() 111');
  })
  .catch(() => {
    console.log('catch() 222');
  })
  .then(() => {
    console.log('then() 333');
  })
  .catch(() => {
    console.log('catch() 444');
  })
  .finally(() => {
    console.log('finally() 555');
  });

process.nextTick(() => {
  console.log('process.nextTick() 666');
});

/*
  process.nextTick 优先级比 promise 更高
 */