// 定义配置
requirejs.config({
  baseUrl: './src', // 基本路径。所有模块的默认路径
  paths: { // 配置单个模块的路径
    module1: 'module1',
    module2: 'module2',
  }
});

// 定义主模块内容
requirejs(['module2'], function (m2) {
  m2();
});