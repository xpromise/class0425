const { resolve } = require('path');

const webpack = require('webpack');

module.exports = {
  entry: {
    vendors: ['jquery', 'lodash'],
  },
  output: {
    path: resolve(__dirname, '../dll'),
    filename: '[name].js',
    library: '[name]'  // 向外暴露打包生成代码 添加为全局变量
  },
  plugins: [
    new webpack.DllPlugin({
      path: resolve(__dirname, '../dll/[name].manifest.json'),
      name: '[name]'
    })
  ],
  mode: 'production'
};