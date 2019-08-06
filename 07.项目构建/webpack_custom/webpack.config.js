const { resolve } = require('path');
const MyWebpackPlugin = require('./plugins/my-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: resolve(__dirname, './build'),
    filename: 'built.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: resolve(__dirname, './loaders/replace-loader.js'),
        options: {
          name: 'peihua'
        }
      }
    ]
  },
  plugins: [
    new MyWebpackPlugin({

    })
  ]
};