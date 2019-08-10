import React from 'react';

// 引入其他组件
import Add from './components/add';
import List from './components/list';

// 引入样式
import './App.css';

/*
  1. 标签必须闭合
  2. 将style改成对象
 */
export default function App() {
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
      <Add />
      <List />
    </div>
  </div>;
}