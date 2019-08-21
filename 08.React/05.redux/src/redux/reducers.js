/*
  根据prevState和action来生成newState的函数模块
 */
import { combineReducers } from 'redux';
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

function category(prevState = [], action) {
  switch (action.type) {
    default :
      return prevState;
  }
}

// store对象管理的state就是num
// export default num;

// store对象管理的state就是{ num, category }
export default combineReducers({
  num,
  category,
});