import React, { Component } from 'react';

class App extends Component {

  render() {
    // 抛出一个异常 / 错误
    // throw new Error('这是故意抛出的错误');
    const a = 123;
    console.log(a());

    return (
      <h1>hello react</h1>
    );
  }
}

export default App;
