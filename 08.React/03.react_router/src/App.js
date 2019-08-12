import React, { Component } from 'react';
// 引入react-router-dom中的BrowserRouter，重命名为Router
// BrowserRouter在最外面使用，这样里面所有子组件都可以使用路由
import { BrowserRouter as Router, Link, NavLink, Route } from 'react-router-dom';

import About from './components/about';
import Home from './components/home';

import MyNavLink from './components/my-nav-link';

import './App.css';

export default class App extends Component {
  render() {
    return <Router>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="page-header">
            <h2>React Router Demo</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            {/*
                Link就相当于a标签，特点： 1. 不会发送请求 2. 不会刷新整个页面 3. 只会更新浏览器历史记录
                NavLink 和Link基本一致，不同的是多了一个选中时的样式，叫active
                  activeClassName 修改类名
            */}
            <MyNavLink to="/about">About</MyNavLink>
            <MyNavLink to="/home">Home</MyNavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              {/* 一旦地址变化成 /about，就立即加载About组件。 一旦变化成其他的，就不加载 */}
              <Route path="/about" component={About}/>
              <Route path="/home" component={Home}/>
            </div>
          </div>
        </div>
      </div>
    </Router>;
  }
}