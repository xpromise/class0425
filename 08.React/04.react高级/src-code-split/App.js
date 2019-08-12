import React, { Component, lazy, Suspense, Fragment } from 'react';

// 定义一个懒加载组件
const LazyLoad = lazy(() => import('./lazy'));

class App extends Component {

  render() {

    return (
      <Fragment>
        <h1>hello react</h1>
        <Suspense fallback={<div>loading....</div>}>
          <LazyLoad />
        </Suspense>
      </Fragment>
    );
  }
}

export default App;
