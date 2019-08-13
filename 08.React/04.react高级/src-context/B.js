import React, { Component } from 'react';

import MyContext from './my-context';

export default class B extends Component {
  render() {
    return <MyContext.Consumer>
      {
        (value) => {
          console.log(value);

          return <h3>B.........</h3>;
        }
      }
    </MyContext.Consumer>;
  }
}