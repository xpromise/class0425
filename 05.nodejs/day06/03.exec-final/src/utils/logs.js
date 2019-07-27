const { createWriteStream } = require('fs');
const { resolve } = require('path');

// 写日志
const filepath = resolve(__dirname, '../../logs', 'access.log');
const ws = createWriteStream(filepath, {
  flags: 'a'  // 追加
});
function access(log) {
  ws.write(log + '\n');
}

module.exports = {
  access
};