/*
  gulpfile.js 这是gulp的配置文件： 当你运行gulp指令时，会读取的配置文件

  开发步骤：
    1. 上插件网 https://gulpjs.com/plugins/ 搜插件  gulp-xxx
      注意：部分插件并没有在官网收集，需要通过npm仓库 https://www.npmjs.com/ 找
    2. 打开文档，下载插件相关的包
    3. 注册任务，写gulp的任务配置
    4. 运行任务  gulp 任务名称
 */

// 引入依赖包
const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require('gulp-browserify');
const rename = require("gulp-rename");

// 注册任务，写gulp的任务配置
gulp.task('babel', () => {
  // 必须写return 否则报错
  return gulp.src('./src/js/*.js')  // 将指定目录下所有的js文件导入到gulp的流中
    .pipe(babel({  // 对流中的文件通过babel进行语法转换  --> 1. 将ES6的模块化语法转换成commonjs 2. 将es6其他语法转换成es5一下
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./build/js')) // 将流中文件输出出去
  // return gulp.src(['./src/js/app.js', './src/js/module1.js'])
});

gulp.task('browserify', function() {
  return gulp.src('build/js/app.js')
    .pipe(browserify()) // 对gulp流中的文件使用browserify进行转换：将commonjs转换浏览器能识别的语法
    .pipe(rename('built.js')) // 对gulp流中的文件使用rename进行重命名
    .pipe(gulp.dest('./build/js'))
});