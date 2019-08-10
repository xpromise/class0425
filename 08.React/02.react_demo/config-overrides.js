const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  // 按需加载css的配置
  fixBabelImports('import', {
    // libraryName: 'antd', // pc端 antd
    libraryName: 'antd-mobile', // 移动端 antd-mobile
    libraryDirectory: 'es',
    style: true,
  }),
  // 自定义主题配置
  addLessLoader({
    javascriptEnabled: true,
    // modifyVars: {'@primary-color': '#1DA57A'}, // pc端 antd
    modifyVars: {'@brand-primary': '#1DA57A'}, // 移动端 antd-mobile
  }),
);
