import React, { Fragment } from 'react';

/*
  Fragment组件： 用来做根标签，不会生成多余的结构
 */
function App() {
  return (
    <Fragment>
      <h1>hello react</h1>
      <span>123321</span>
    </Fragment>
  );
}

export default App;
