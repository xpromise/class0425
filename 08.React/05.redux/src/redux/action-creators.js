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

export const increment = (data) => ({type: INCREMENT, data});

export const decrement = (data) => ({type: DECREMENT, data});