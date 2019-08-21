/*
  用来存储state的仓库，读取/更新方法都在store对象中
    store.getState() 读取
    store.dispatch(action) 触发更新
    store.subscribe(listener) 监听状态的变化
 */

// 引入创建store对象的方法
import { createStore, applyMiddleware } from 'redux';
// 引入异步中间件，在redux中处理异步请求更新状态
import thunk from 'redux-thunk';
// 引入开发时redux的调试工具
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

// 创建store，需要传入reducers函数
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

// 暴露出去
export default store;