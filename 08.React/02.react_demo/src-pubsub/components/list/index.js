import React, { Component } from 'react';
import PubSub from 'pubsub-js';

import Item from '../item';

export default class List extends Component {
  // 初始化状态数据
  state = {
    comments: [
      { name: 'jack', content: 'I Love Rose', id: 1 },
      { name: 'rose', content: 'I Love peihua', id: 2 }
    ]
  };

  del = (i) => {
    this.setState({
      comments: this.state.comments.filter((comment, index) => index !== i)
    })
  };

  componentDidMount() {
    // 订阅消息
    PubSub.subscribe('ADD_COMMENT', (msg, comment) => {
      // console.log(msg, comment);  // ADD_COMMENT {name: "aaa", content: "bbb", id: 3}
      this.setState({
        comments: [comment, ...this.state.comments]
      })
    })
  }

  render() {
    const { comments } = this.state;
    // 当样式需要通过js来控制，这时候就用行内样式
    const isDisplay = comments.length ? 'none' : 'block';

    return <div className="col-md-8">
      <h3 className="reply">评论回复：</h3>
      <h2 style={{display: isDisplay}}>暂无评论，点击左侧添加评论！！！</h2>
      <ul className="list-group">
        {
          comments.map((comment, index) => {
            return <Item key={comment.id} comment={comment} del={this.del} index={index}/>
          })
        }
      </ul>
    </div>;
  }
}