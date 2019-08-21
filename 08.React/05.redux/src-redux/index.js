import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import store from './redux/store';

// 一旦状态发生变化，就会触发函数
/*store.subscribe(() => {
  // 重新渲染组件
  render();
});*/
store.subscribe(render);

// 初始化渲染
render();
function render() {
  ReactDOM.render(<App />, document.getElementById('root'));
}
