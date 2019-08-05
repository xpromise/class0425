/*
  webpack的配置文件。 运行配置文件的指令： webpack

  运行构建后的代码：
    npm i serve -g
    serve build -p 5001
 */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpack = require('webpack');

module.exports = {
  mode: 'production', // 模式
  entry: {
    main: './src/js/app.js'
  },
  output: { // 输出
    path: resolve(__dirname, '../build'), // 文件输出目录
    filename: 'js/built.js', // 文件输出名称
    publicPath: '/',  // 公共路径
  },
  module: {
    rules: [  // 里面写loader的配置
      {
        test: /\.js$/,
        enforce: 'pre', // 优先执行
        // npm i eslint eslint-loader -D
        // 在package.json添加eslintConfig配置项
        exclude: /node_modules/,  // 排除node_modules。 node_modules不进行语法检查
        // include: resolve(__dirname, 'src/js'),
        loader: "eslint-loader",
      },
      {
        oneOf: [ // 以下loader只匹配一个
          {
            // 下载包  npm i less less-loader css-loader style-loader -D
            test: /\.less$/, // 检查文件是否以.less结尾（检查是否是less文件）
            use: [  // 数组中loader执行是从下到上，从右到左顺序执行
              MiniCssExtractPlugin.loader, // 提取js中的css成单独文件
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
                publicPath: '/images',  // 决定图片的url路径
                name: '[hash:8].[ext]' // 修改文件名称 [hash:8] hash值取8位  [ext] 文件扩展名
              }
            }
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
                      useBuiltIns: 'usage',  // 按需引入需要使用polyfill
                      corejs: { version: 3 }, // 解决warn
                      targets: { // 指定兼容性处理哪些浏览器
                        "chrome": "58",
                        "ie": "9",
                      }
                    }
                  ]
                ],
                cacheDirectory: true, // 开启babel缓存
              }
            }
          },
          {
            test: /\.(html)$/,
            loader: 'html-loader' // 处理html的img
          },
          {
            test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,  // 处理其他资源
            loader: 'file-loader',
            options: {
              outputPath: 'media',
              name: '[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({  // 创建html文件，自动引入打包生产js\css资源
      template: './src/index.html' // 以当前文件为模板创建新的HtML(1. 结构和原来一样 2. 会自动引入打包的资源)
    }),
    new CleanWebpackPlugin(),  // 清除指定目录的所有文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
  ],
  devtool: 'cheap-module-source-map', // 开发环境的错误提示
  performance: {
    hints: false // 关掉性能提示
  },
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({ // 压缩css
        cssProcessorOptions: { // 解决source-map问题
          map: {
            inline: false,
            annotation: true,
          }
        }
      })
    ],
  },
};