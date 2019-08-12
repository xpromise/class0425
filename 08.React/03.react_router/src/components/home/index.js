import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

import MyNavLink from '../my-nav-link';
import News from '../news';
import Messages from '../messages';

export default class Home extends Component {
  render() {
    return <div>
      <ul className="nav nav-tabs">
        <li><MyNavLink to="/home/news">News</MyNavLink></li>
        <li><MyNavLink to="/home/messages">Message</MyNavLink></li>
      </ul>
      <div>
        <Route path="/home/news" component={News}/>
        <Route path="/home/messages" component={Messages}/>
        <Redirect to="/home/news"/>
      </div>
    </div>;
  }
}