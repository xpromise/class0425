import React, { Component } from 'react';

export default class App extends Component {
  state = {
    num: 0,
    value: 1
  };

  increment = () => {
    const { num, value } = this.state;
    this.setState({
      num: num + +value
    })
  };

  decrement = () => {
    const { num, value } = this.state;
    this.setState({
      num: num - +value
    })
  };

  incrementIfOdd = () => {
    const { num, value } = this.state;
    if (num % 2 === 0) return;
    this.setState({
      num: num + +value
    })
  };

  incrementAsync = () => {
    setTimeout(() => {
      const { num, value } = this.state;
      this.setState({
        num: num + +value
      })
    }, 1000)
  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value
    })
  };

  render() {
    const { num, value } = this.state;
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