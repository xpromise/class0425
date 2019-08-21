/*
  根据prevState和action来生成newState的函数模块
 */
import { INCREMENT, DECREMENT } from './action-types';

function num(prevState = 0, action) {
  console.log(prevState, action);
  switch (action.type) {
    case INCREMENT :
      return prevState + action.data;
    case DECREMENT :
      return prevState - action.data;
    default :
      return prevState;
  }
}

export default num;