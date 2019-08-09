import React, { Component } from 'react';
import PropTypes from 'prop-types';

// 受控组件
export default class Add extends Component {
  static propTypes = {
    updateComment: PropTypes.func.isRequired
  };

  state = {
    name: '',
    content: ''
  };

  handleChange = (key) => {
    // 外层函数负责传入key。key就是要更新state的名称
    return (e) => {
      // 里层函数就是真正的绑定事件回调函数
      this.setState({
        [key]: e.target.value
      })
    }
  };

  addComment = (e) => {
    // 禁止默认行为
    e.preventDefault();
    // 收集表单数据
    const { name, content } = this.state;
    // 如果数据为空，就提示给用户错误信息
    if (!name || !content) return alert('输入内容不能为空');
    // 将数据传递给App
    this.props.updateComment({ name, content });
    // 清空表单数据
    this.setState({
      name: '',
      content: ''
    })
  };

  render() {
    const { name, content } = this.state;

    return <div className="col-md-4">
      <form className="form-horizontal" onSubmit={this.addComment}>
        <div className="form-group">
          <label>用户名</label>
          <input type="text" className="form-control" placeholder="用户名" value={name} onChange={this.handleChange('name')}/>
        </div>
        <div className="form-group">
          <label>评论内容</label>
          <textarea className="form-control" rows="6" placeholder="评论内容" value={content} onChange={this.handleChange('content')}/>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            {/* 要把button 改成 type="submit"*/}
            <button type="submit" className="btn btn-default pull-right">提交</button>
          </div>
        </div>
      </form>
    </div>;
  }
}