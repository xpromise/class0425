import React, { Component } from 'react';
// 引入组件
import { Button, Toast } from 'antd-mobile';
// 引入样式
// import 'antd/dist/antd.min.css';

import './App.css';

export default class App extends Component {

  handleClick = () => {
    // message.success('点击了按钮~', 1);
    Toast.success('点击了按钮~', 1);
  };

  render() {
    return <div>
      <Button type="primary" onClick={this.handleClick}>按钮</Button>
      <Button type="danger">按钮</Button>

      {/*<Carousel autoplay>
        <div>aaa</div>
        <div>bbb</div>
        <div>ccc</div>
      </Carousel>*/}
    </div>;
  }
}