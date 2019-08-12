import React, { Component } from 'react';

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

  render() {
    return <ul>
      {
        this.state.messages.map((item) => {
          return <li key={item.id}>{item.content}</li>
        })
      }
    </ul>;
  }
}