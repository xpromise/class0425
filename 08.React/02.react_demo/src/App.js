/*
  定义App组件
 */

import React from 'react';
// 引入样式
import './App.css';
// 引入图片
import img from './1.jpg';

// 定义组件
class App extends React.Component {
  render() {
    return <div>
      <h1 className="title">App.....</h1>
      <img src={img} alt="img~~~~"/>
    </div>;
  }
}

// 暴露出去
export default App;