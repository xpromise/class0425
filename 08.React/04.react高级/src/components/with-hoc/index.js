import React, { Component, Fragment } from 'react';

/*
  高阶组件：HOC  High-Order-Component
    本质上是一个函数。执行函数时传入一个组件作为参数，返回值是一个新组件
    提取组件的公共代码到高阶组件中
    作用：用来复用组件公共代码（函数）
 */
export default function (title) {
  // 负责传参
  return function withHoc(WrappedComponent) {
    // 高阶组件
    return class extends Component {
      static displayName = `with(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`; // 优先级高

      state = {
        username: '',
        password: '',
        rePassword: ''
      };

      handleChange = (key) => {
        return (e) => {
          this.setState({
            [key]: e.target.value
          })
        }
      };

      handleSubmit = () => {
        const { username, password, rePassword } = this.state;
        alert(`username: ${username}, password: ${password}`);
      };

      render() {
        return <Fragment>
          <h1>{title}</h1>
          <WrappedComponent handleChange={this.handleChange} handleSubmit={this.handleSubmit}/>
        </Fragment>
      }
    };
  }
}
