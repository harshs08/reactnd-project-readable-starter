import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../styles/App.css';

import PostList from './PostList'
import PostAdd from './PostAdd'
import PostDetail from './PostDetail'
import PostCommentsAdd from './PostCommentsAdd'
import PostCommentsEdit from './PostCommentsEdit'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path='/' render={() => (
            <PostList />
          )} />
          <Route path='/:category/post/add' component={PostAdd} />
          <Route exact path='/:category' component={PostList} />
          <Route exact path='/:category/:id' component={PostDetail} />
          <Route exact path='/posts/comments/edit/:id' component={PostCommentsEdit} />
          <Route exact path='/posts/comments/:parentId' component={PostCommentsAdd} />
        </div>
      </Router>
    );
  }
}

export default App
