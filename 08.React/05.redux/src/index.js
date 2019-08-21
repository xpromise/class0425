import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store';

// Provider组件使用context语法，负责给要使用redux的state组件从传入state
// 负责一旦状态更新，重新渲染组件
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
