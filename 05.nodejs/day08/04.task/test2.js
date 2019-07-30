// 请说说以下代码的执行顺序
const promise = new Promise((resolve, reject) => {
  reject(true);
});

promise
  .then(() => {
    process.nextTick(() => {
      console.log('process.nextTick() 111');
    });
    console.log('then() 111');
  })
  .catch(() => {
    process.nextTick(() => {
      console.log('process.nextTick() 222');
    });
    console.log('catch() 222');
  })
  .then(() => {
    process.nextTick(() => {
      console.log('process.nextTick() 333');
    });
    console.log('then() 333');
  })
  .catch(() => {
    process.nextTick(() => {
      console.log('process.nextTick() 444');
    });
    console.log('catch() 444');
  })
  .finally(() => {
    process.nextTick(() => {
      console.log('process.nextTick() 555');
    });
    console.log('finally() 555');
  });

process.nextTick(() => {
  console.log('process.nextTick() 666');
});

