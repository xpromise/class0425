import React, { Component, Fragment } from 'react';

// 引入高阶组件
import withHoc from '../with-hoc';

class Login extends Component {

  render() {
    const { handleSubmit, handleChange } = this.props;

    return <form onSubmit={handleSubmit}>
      用户名: <input type="text" onChange={handleChange('username')}/> <br/>
      密码: <input type="password" onChange={handleChange('password')}/> <br/>
      <input type="submit" value="登录"/>
    </form>
  }
}

const newLogin = withHoc('用户登录')(Login);
export default newLogin;