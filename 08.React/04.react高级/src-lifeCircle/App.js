import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    /*
      super(props); 就能在constructor中使用this.props
      super(); this.props就是undefined
     */
    console.log('constructor()');
    // 初始化状态
    this.state = {
      flag: false
    }
  }

  // 根据props来修改state
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps()');
    // console.log(this); // 在static静态方法中没有this
    return {
      flag: true
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    console.log('shouldComponentUpdate()');
    return true;
  }

  /*
    这个生命周期函数中是能获取到DOM元素。在真正渲染之前修改DOM
   */
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate()');
    return null;
  }

  componentDidUpdate() {
    console.log('componentDidUpdate()');
  }

  componentDidMount() {
    console.log('componentDidMount()');
  }

  handleClick = () => {
    this.setState({
      flag: !this.state.flag
    })
  };

  render() {
    console.log('render()');
    console.log(this.state.flag);
    return (
      <h1 onClick={this.handleClick}>hello react</h1>
    );
  }
}

export default App;
