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
      },
      {
        test: /\.(png|jpg|gif)$/,
        // npm i url-loader file-loader -D
        use: {
          loader: 'url-loader',
          options: {
            limit: 8192, // 8kb --> 8kb以下的图片会base64处理
            outputPath: 'images', // 决定文件本地输出路径
            publicPath: '../build/images',  // 决定图片的url路径
            name: '[hash:8].[ext]' // 修改文件名称 [hash:8] hash值取8位  [ext] 文件扩展名
          }
        }
      },
      {
        test: /\.js$/,
        // npm i eslint eslint-loader -D
        // 在package.json添加eslintConfig配置项
        exclude: /node_modules/,  // 排除node_modules。 node_modules不进行语法检查
        // include: [],
        loader: "eslint-loader",
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          // npm i babel-loader @babel/core @babel/preset-env @babel/polyfill core-js
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',  // 按需加载需要使用polyfill
                  corejs: { version: 3 }, // 解决warn
                  targets: { // 指定兼容性处理哪些浏览器
                    "chrome": "58",
                    "ie": "9",
                  }
                }
              ]
            ]
          }
        }
      }
    ]
  }
};