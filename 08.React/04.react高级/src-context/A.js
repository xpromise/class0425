import React, { Component, Fragment } from 'react';

import B from './B';
import MyContext from './my-context';

export default class A extends Component {
  render() {
    return <Fragment>
      <MyContext.Consumer>
        {
          (value) => {
            console.log(value);
            return <h2>A..........</h2>;
          }
        }
      </MyContext.Consumer>
      <B />
    </Fragment>;
  }
}