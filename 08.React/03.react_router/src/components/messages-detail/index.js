import React, { Component } from 'react';

export default class MessagesDetail extends Component {
  state = {
    messagesDetail: [
      {id: 1, content: 'messages 001'},
      {id: 2, content: 'messages 002'},
      {id: 3, content: 'messages 003'},
      {id: 4, content: 'messages 004'},
    ]
  };

  render() {
    // 获取占位符id值
    const id = +this.props.match.params.id;

    const message = this.state.messagesDetail.find((item) => item.id === id);

    return <div>
      { message.content }
    </div>;
  }
}