import React from 'react';
import { NavLink } from 'react-router-dom';

/*
export default class MyNavLink extends Component {
  render() {
    // console.log(this.props);
    // return <NavLink className="list-group-item" to={this.props.to} activeClassName="my-active">{this.props.children}</NavLink>;
    return <NavLink className="list-group-item" activeClassName="my-active" {...this.props} />;
  }
}*/

export default function MyNavLink(props) {
  // console.log(this.props);
  // return <NavLink className="list-group-item" to={this.props.to} activeClassName="my-active">{this.props.children}</NavLink>;
  return <NavLink className="list-group-item" activeClassName="my-active" {...props} />;
}