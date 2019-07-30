const fs = require('fs');

setImmediate(() => {
  console.log('setImmediate() 111');
});

fs.readFile('宏任务和微任务.md', (err, data) => {
  if (!err) {
    setImmediate(() => {
      console.log('setImmediate() 222');
    });

    console.log('readFile() 333');

    setTimeout(() => {
      console.log('setTimeout() 444');
    }, 0);
  }
  else console.log(err);
});

setTimeout(() => {
  console.log('setTimeout() 555');
}, 0);



