const redis = require('redis');

const client = redis.createClient(6379, 'localhost');

client.on('error', (err) => {
  console.log('redis connect error :', err);
});

function get(key) {
  return new Promise((resolve, reject) => {
    client.get(key, (err, value) => {
      if (err) reject(err);
      else {
        // resolve(JSON.parse(value || {}));
        try {
          resolve(JSON.parse(value));
        } catch (e) {
          resolve({});
        }
      }
    })
  })
}

function set(key, value) {
  return new Promise((resolve, reject) => {
    if (typeof value === 'object') {
      value = JSON.stringify(value);
    }
    client.set(key, value, resolve);
  })
}

module.exports = {
  get,
  set
};