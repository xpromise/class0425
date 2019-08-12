import React, { Component } from 'react';

export default class News extends Component {
  state = {
    news: [
      {id: 1, content: 'news 001'},
      {id: 2, content: 'news 002'},
      {id: 3, content: 'news 003'},
      {id: 4, content: 'news 004'},
    ]
  };

  render() {
    return <ul>
      {
        this.state.news.map((item) => {
          return <li key={item.id}>{item.content}</li>
        })
      }
    </ul>;
  }
}