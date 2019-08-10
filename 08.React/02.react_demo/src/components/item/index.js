import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.css';

export default class Item extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    del: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
  };

  delComment = () => {
    // 弹出提示
    const { del, comment, index } = this.props;
    if (!window.confirm(`你确认需要删除${comment.name}的评论吗？`)) return;
    // 删除评论
    del(index);
  };

  render() {
    const { name, content } = this.props.comment;

    return <li className="list-group-item">
      <div className="handle">
        <button className="del-btn" onClick={this.delComment}>删除</button>
      </div>
      <p className="user"><span>{name}</span><span>说:</span></p>
      <p className="centence">{content}</p>
    </li>;
  }
}