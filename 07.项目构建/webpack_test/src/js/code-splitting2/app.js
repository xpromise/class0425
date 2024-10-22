// 同步引入代码分割
// import _ from 'lodash';
// console.log(_.join(['hello', 'webpack'], '~~~'));

// 异步引入代码分割
/*
function component() {
  const element = document.createElement('div');
  return import('lodash').then(({default: _}) => {
    element.innerText = _.join(['hello', 'webpack'], '~~~');
    return element;
  })
}

component().then((element) => {
  document.body.appendChild(element);
});
*/

import '../less/test1.less';
import '../less/test2.less';

const div = document.createElement('div');
div.innerText = _.join(['点', '我'], '~');
/*div.onclick = function () {
  // webpackPrefetch: true 实现等浏览器空闲偷偷加载资源
  // webpackChunkName: "lodash" 给chunk命名
  import(/!* webpackChunkName: "lodash", webpackPrefetch: true *!/'lodash').then(({default: _}) => {
    const div = document.createElement('div');
    div.innerText = _.join(['hello', 'webpack'], '~~~');
    document.body.appendChild(div);
  })
};*/
document.body.appendChild(div);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}