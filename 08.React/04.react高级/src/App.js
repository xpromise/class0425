import React, { Component, Fragment } from 'react';

import A from './A';
import MyContext from './my-context';

class App extends Component {

  render() {

    return (
      <Fragment>
        <h1>App组件...</h1>
        <MyContext.Provider value={{flag: true}}>
          <A />
        </MyContext.Provider>
      </Fragment>
    );
  }
}

export default App;
