import React, { Component } from 'react';

import { Link, Route } from 'react-router-dom';

import MessagesDetail from '../messages-detail';

export default class Messages extends Component {
  state = {
    messages: []
  };

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({
        messages: [
          {id: 1, content: 'messages 001'},
          {id: 2, content: 'messages 002'},
          {id: 3, content: 'messages 003'},
          {id: 4, content: 'messages 004'},
        ]
      })
    }, 1000)
  }

  componentWillUnmount() {
    // 清除定时器
    clearTimeout(this.timer);
  }

  push = (path) => {
    return () => {
      this.props.history.push(path);
    }
  };

  goBack = () => {
    this.props.history.goBack();
  };

  goForward = () => {
    this.props.history.goForward();
  };

  render() {
    return <div>
      <ul>
        {
          this.state.messages.map((item) => {
            const path = `/home/messages/${item.id}`;
            return <li key={item.id}>
              <Link to={path}>{item.content}</Link>
              <button onClick={this.push(path)}>push</button>
            </li>
          })
        }
      </ul>
      <button onClick={this.goBack}>back</button>
      <button onClick={this.goForward}>forward</button>
      {/*
          路径匹配方式：
            一对一关系： /home/message/1  只能匹配一个地址
            多对一关系： /home/message/:id 能够匹配多个地址
      */}
      <Route path="/home/messages/:id" component={MessagesDetail}/>
    </div>;
  }
}