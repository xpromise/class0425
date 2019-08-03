/*
  webpack的配置文件。 运行配置文件的指令： webpack
 */

const { resolve } = require('path');

module.exports = {
  mode: 'development', // 模式
  // entry: './src/js/app.js', // 入口
  entry: {
    main: './src/js/app.js'
  },
  output: { // 输出
    path: resolve(__dirname, 'build'), // 文件输出目录
    filename: './js/built.js' // 文件输出名称
  },
  module: {
    rules: [  // 里面写loader的配置
      {
        // 下载包  npm i less less-loader css-loader style-loader -D
        test: /\.less$/, // 检查文件是否以.less结尾（检查是否是less文件）
        use: [  // 数组中loader执行是从下到上，从右到左顺序执行
          'style-loader', // 创建style标签，添加上js中的css代码
          'css-loader', // 将css以commonjs方式整合到js文件中
          'less-loader'  // 将less文件解析成css文件
        ]
      }
    ]
  }
};