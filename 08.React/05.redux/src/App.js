import React, { Component } from 'react';
import store from './redux/store';
import { increment, decrement } from './redux/action-creators';

export default class App extends Component {
  state = {
    value: 1
  };

  increment = () => {
    const { value } = this.state;
    // 创建action对象
    const action = increment(+value);
    // 调用dispatch方法触发更新
    store.dispatch(action);
  };

  decrement = () => {
    const { value } = this.state;
    // 创建action对象
    const action = decrement(+value);
    // 调用dispatch方法触发更新
    store.dispatch(action);
  };

  incrementIfOdd = () => {
    const { value } = this.state;
    // 读取num
    const num = store.getState();
    if (num % 2 === 0) return;
    // 创建action对象
    const action = increment(+value);
    // 调用dispatch方法触发更新
    store.dispatch(action);
  };

  incrementAsync = () => {
    setTimeout(() => {
      const { value } = this.state;
      // 创建action对象
      const action = increment(+value);
      // 调用dispatch方法触发更新
      store.dispatch(action);
    }, 1000)
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  };

  render() {
    const { value } = this.state;
    // 读取redux保存的状态数据值
    const num = store.getState();

    return <div>
      <h1>click { num } times</h1>
      <select onChange={this.handleChange} value={value}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>
      <button onClick={this.increment}>+</button>
      <button onClick={this.decrement}>-</button>
      <button onClick={this.incrementIfOdd}>increment if odd</button>
      <button onClick={this.incrementAsync}>increment async</button>
    </div>;
  }
}