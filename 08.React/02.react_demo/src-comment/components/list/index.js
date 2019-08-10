import React, { Component } from 'react';
// prop-types不是直接依赖，他是依赖的依赖
import PropTypes from 'prop-types';

import Item from '../item';

export default class List extends Component {
  // 约束要接受props的类型和必要性
  static propTypes = {
    comments: PropTypes.array.isRequired,
    del: PropTypes.func.isRequired
  };

  render() {
    // 获取props
    const { comments, del } = this.props;

    // 当样式需要通过js来控制，这时候就用行内样式
    const isDisplay = comments.length ? 'none' : 'block';

    return <div className="col-md-8">
      <h3 className="reply">评论回复：</h3>
      <h2 style={{display: isDisplay}}>暂无评论，点击左侧添加评论！！！</h2>
      <ul className="list-group">
        {
          comments.map((comment, index) => {
            return <Item key={comment.id} comment={comment} del={del} index={index}/>
          })
        }
      </ul>
    </div>;
  }
}