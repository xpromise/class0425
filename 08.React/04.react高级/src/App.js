import React, { Component, Fragment } from 'react';

import Login from './components/login';
import Register from './components/register';

class App extends Component {

  render() {

    return (
      <Fragment>
        <Login />
        <Register />
      </Fragment>
    );
  }
}

export default App;
