import React, { Component } from 'react';

import App from './App';

export default class ErrorBoundary extends Component {
  state = {
    error: false
  };

  // 一旦子组件出错，当前函数会被触发，需要更新状态
  static getDerivedStateFromError(error) {
    // console.log(error);
    // 更新组件的状态，重新渲染组件
    return {
      error: true
    }
  }
  /*
    同来统计错误
   */
  componentDidCatch(error, info) {
    // 发送请求，发送到后台
    // img.src = `http://localhost:3000/error?error=${error}&info=${info}`;
    console.log(error, info);
  }

  render() {
    const { error } = this.state;
    // console.log(error);
    if (error) {
      return <h1>备用的渲染方案</h1>;
    }

    return <div>
      ErrorBoundary
      <App />
    </div>;
  }
}