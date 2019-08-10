import React from 'react';

import './index.css';

export default function Item(props) {

  const delComment = () => {
    // 弹出提示
    const { del, comment, index } = props;
    if (!window.confirm(`你确认需要删除${comment.name}的评论吗？`)) return;
    // 删除评论
    del(index);
  };

  const { name, content } = props.comment;

  return <li className="list-group-item">
    <div className="handle">
      <button className="del-btn" onClick={delComment}>删除</button>
    </div>
    <p className="user"><span>{name}</span><span>说:</span></p>
    <p className="centence">{content}</p>
  </li>;
}