import React, {Component} from 'react';
import PubSub from 'pubsub-js'
import axios from 'axios'

export default class List extends Component {

  state={
    users:[], // 控制成功状态
    firstView:true,  // 控制初始化状态
    error:''  // 控制错误状态
  };

  componentDidMount() {
    PubSub.subscribe('SEARCH',(msg,name)=>{
      // 更新为loading
      this.setState({
        users:[],
        firstView:false,  // 取消初始化显示
        error:''
      });
      axios.get(`https://api.github.com/search/users?q=${name}`)
        .then((response)=>{
          const users=response.date.items.map((item)=>{
            return {
              name:item.login,
              url:item.html_url,
              img:item.avatar_url
            }
          });
          console.log(response);
          // 更新状态
          this.setState({
            users
          })
        })
        .catch((error)=>{
          this.setState({
            error:'网路出现故障，请刷新重试'
          })
        })
    });
  }


  render() {
    const { users, firstView, error } = this.state;

    if (firstView) {
      return <h1>enter name to search</h1>
    }

    if (error){
      return <h1>{error}</h1>
    }


    if (users.length) {
      return <div className="row">
        {
          users.map((user,index)=>{
            return <div className="card" key={index}>
              <a href={user.url} target="_blank">
                <img src={user.img} style={{width: 100}}/>
              </a>
              <p className="card-text">{user.name}</p>
            </div>
          })
        }
      </div>
    }
    return <h1>loading...</h1>
  }
}