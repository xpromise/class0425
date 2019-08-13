import React, { Component, Fragment } from 'react';

import withHoc from '../with-hoc';

class Register extends Component {
 /* state = {
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
    alert(`username: ${username}, password: ${password}, rePassword: ${rePassword}`);
  };*/

  render() {
    const { handleSubmit, handleChange } = this.props;

    return <form onSubmit={handleSubmit}>
      用户名: <input type="text" onChange={handleChange('username')}/> <br/>
      密码: <input type="password" onChange={handleChange('password')}/> <br/>
      确认密码: <input type="password" onChange={handleChange('rePassword')}/> <br/>
      <input type="submit" value="注册"/>
    </form>
  }
}

export default withHoc('用户注册')(Register);