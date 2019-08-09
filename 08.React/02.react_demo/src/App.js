import React, { Component } from 'react';

// 引入其他组件
import Add from './components/add';
import List from './components/list';

// 引入样式
import './App.css';

/*
  1. 标签必须闭合
  2. 将style改成对象
 */
export default class App extends Component {
  // 初始化状态数据
  state = {
    comments: [
      { name: 'jack', content: 'I Love Rose' },
      { name: 'rose', content: 'I Love peihua' }
    ]
  };

  updateComment = (comment) => {
    // 不要修改原数据
    this.setState({
      comments: [comment, ...this.state.comments]
    })
  };

  render() {
    return <div>
      <header className="site-header jumbotron">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <h1>请发表对React的评论</h1>
            </div>
          </div>
        </div>
      </header>
      <div className="container">
        <Add updateComment={this.updateComment}/>
        <List comments={this.state.comments}/>
      </div>
    </div>;
  }
}