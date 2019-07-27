const redis = require('redis');
const { REDIS_CONFIG } = require('../../config');

const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host);

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