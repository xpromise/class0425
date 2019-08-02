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
const eslint = require('gulp-eslint');
const less = require('gulp-less');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const open = require('open');
const uglify = require('gulp-uglify');
const cssmin = require('gulp-cssmin');
const htmlmin = require('gulp-htmlmin');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// 注册任务，写gulp的任务配置
gulp.task('babel', () => {
  // 必须写return 否则报错
  return gulp.src('./src/js/*.js')  // 将指定目录下所有的js文件导入到gulp的流中
    .pipe(babel({  // 对流中的文件通过babel进行语法转换  --> 1. 将ES6的模块化语法转换成commonjs 2. 将es6其他语法转换成es5一下
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./build/js')) // 将流中文件输出出去
    .pipe(connect.reload());
  // return gulp.src(['./src/js/app.js', './src/js/module1.js'])
});

gulp.task('browserify', function() {
  return gulp.src('build/js/app.js')
    .pipe(browserify()) // 对gulp流中的文件使用browserify进行转换：将commonjs转换浏览器能识别的语法
    .pipe(rename('built.js')) // 对gulp流中的文件使用rename进行重命名
    .pipe(gulp.dest('./build/js'))
    .pipe(connect.reload());
});

/*
  "eslintConfig": {
    "parserOptions": {  配置使用的es规范
      "ecmaVersion": 6,  使用es6
      "sourceType": "module" 使用es6模块化
    },
    "env": {  配置环境
      "browser": true  浏览器环境：支持使用浏览器的全局变量
    },
    "globals": { 全局变量
      "$": "readonly"
    },
    "rules": {  详细检查规则
      "no-console": 0,  // 忽略检查
      "eqeqeq": 1, // 出现警告
      "no-alert": 2 // 出现错误
    },
    "extends": "eslint:recommended"  // 使用eslint的推荐配置
  }
 */
gulp.task('eslint', () => {
  return gulp.src('./src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(connect.reload());
});

gulp.task('less', function () {
  return gulp.src('./src/less/*.less')
    .pipe(less()) // 将less编译成css
    .pipe(concat('built.css')) // 将多个文件合并成一个文件
    .pipe(gulp.dest('./build/css'))
    .pipe(connect.reload());
});

gulp.task('html', () => {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});

// 自动化
gulp.task('watch', () => {

  // 开启服务器
  connect.server({
    name: 'Dev App',
    root: ['build'], // 运行项目的目录
    port: 3000,
    livereload: true // 热更新功能： 自动刷新浏览器
  });

  // 自动打开浏览器
  open('http://localhost:3000');

  // 自动编译
  // 一旦js文件发生变化，就立即执行gulp.series(['js'])任务
  gulp.watch('./src/js/*.js', gulp.series(['js']));
  gulp.watch('./src/less/*.less', gulp.series(['less']));
  gulp.watch('./src/index.html', gulp.series(['html']));
});

gulp.task('uglify', () => {
  return gulp.src('./build/js/built.js')
    .pipe(uglify()) // 压缩js： 1. 将变量名改为单个字母 2. 去除多余的空格和换行符 3. 移除注释
    .pipe(rename('dist.min.js'))
    .pipe(gulp.dest('./dist/js'))
});

gulp.task('cssmin', () => {
  const plugins = [
    autoprefixer(),
    cssnano()
  ];

  return gulp.src('./build/css/built.css')
    .pipe(postcss(plugins)) // 做样式的兼容性处理
    .pipe(cssmin())
    .pipe(rename('dist.min.css'))
    .pipe(gulp.dest('./dist/css'))
});

gulp.task('htmlmin', () => {
  return gulp.src('./build/index.html')
    .pipe(htmlmin({
      collapseWhitespace: true, // 去除空格
      removeComments: true, // 移除注释
    }))
    .pipe(gulp.dest('./dist'))
});

// 配置统一任务：里面负责按照顺序执行多个任务
gulp.task('js', gulp.series(['eslint', 'babel', 'browserify'])); // 同步依次执行
// gulp.task('js', gulp.parallel(['eslint', 'babel', 'browserify'])); // 异步执行、
gulp.task('js-dev', gulp.parallel(['js', 'less', 'html']));

gulp.task('dev', gulp.series(['js-dev', 'watch']));

gulp.task('js-prod', gulp.parallel(['uglify', 'cssmin', 'htmlmin']));

gulp.task('prod', gulp.series(['js-dev', 'js-prod']));

/*
  开发环境：搭建一个代码可以运行的环境
  生产环境: 输出项目上线使用的代码

  开发依赖：项目构建时使用的依赖：babel、uglify...
  生产依赖：项目运行时需要使用的依赖：jquery..
 */

