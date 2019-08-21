import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from './redux/action-creators';

class App extends Component {
  state = {
    value: 1
  };

  increment = () => {
    const { value } = this.state;
    this.props.increment(+value);
  };

  decrement = () => {
    const { value } = this.state;
    this.props.decrement(+value);
  };

  incrementIfOdd = () => {
    const { value } = this.state;
    // 读取num
    const { num } = this.props;
    if (num % 2 === 0) return;
    this.props.increment(+value);
  };

  incrementAsync = () => {
    setTimeout(() => {
      const { value } = this.state;
      this.props.increment(+value);
    }, 1000)
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  };

  render() {
    const { value } = this.state;
    const { num } = this.props;

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

/****** react-redux ******/
// 将store对象管理的状态数据以props方式传递给App
const mapStateToProps = (state) => {
  // state就是store管理的所有状态数据
  // 返回一个状态数据对象，这个对象就会以props的方式传入App
  return {
    num: state
  }
};

// 将store对象更新状态的方法以props方式传递给App
const mapDispatchToProps = (dispatch) => {
  // dispatch 就是 store.dispatch
  // 返回一个操作状态数据方法的对象，这个对象就会以props的方式传入App
  return {
    increment(data) {
      const action = increment(data);
      dispatch(action);
    },
    decrement(data) {
      dispatch(decrement(data));
    }
  }
};

/*
  react-redux：
    将组件分为两大类：普通组件、容器组件
      容器组件就是使用redux的组件，放在containers下
      普通组件就是没有使用redux的组件，放在components下
 */

// connect高阶组件，负责给App组件传递redux的内容
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  App
)