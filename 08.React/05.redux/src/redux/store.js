/*
  用来存储state的仓库，读取/更新方法都在store对象中
    store.getState() 读取
    store.dispatch(action) 触发更新
    store.subscribe(listener) 监听状态的变化
 */

// 引入创建store对象的方法
import { createStore } from 'redux';
import reducers from './reducers';

// 创建store，需要传入reducers函数
const store = createStore(reducers);

// 暴露出去
export default store;