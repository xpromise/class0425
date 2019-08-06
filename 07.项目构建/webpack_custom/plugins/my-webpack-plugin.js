
class MyWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync('MyWebpackPlugin', (compilation, cb) => {
      compilation.assets['a.txt'] = {
        source() {
          return 'hello webpack';
        },
        size() {
          return 13;
        }
      }
      cb();
    })
  }

}

module.exports = MyWebpackPlugin;