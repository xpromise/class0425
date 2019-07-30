const fs = require('fs');

setImmediate(() => {
  console.log('setImmediate() 222');
});

fs.readFile('宏任务和微任务.md', (err, data) => {
  if (!err) console.log('readFile() 333');
  else console.log(err);
});

setTimeout(() => {
  console.log('setTimeout() 444');
}, 0);



