/*
  用来创建action对象的工厂函数模块
    action: {type: xxx, data: xxx}
 */
/*function increment(data) {
  return {
    type: 'INCREMENT',
    data: data
  }
}*/

import { INCREMENT, DECREMENT } from './action-types';

// 同步action：函数返回值是action对象
export const increment = (data) => ({type: INCREMENT, data});

export const decrement = (data) => ({type: DECREMENT, data});

// 异步action：函数返回值还是一个函数
export const incrementAsync = (data) => {
  return (dispatch) => {
    // 在函数里面做异步操作
    setTimeout(() => {
      dispatch(increment(data));
    }, 1000)
  }
};