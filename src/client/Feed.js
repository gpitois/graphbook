import React, { Component } from 'react';
import '../../assets/css/style.css';

import FeedList from './components/post/feedlist';
import PostsFeedQuery from './components/queries/postsFeed';
import PostForm from './components/post/form';
import AddPostMutation from './components/mutations/addPost';

export default class Feed extends Component {

  render() {
    const QUERY_VARIABLES = { page: 0, limit: 10 };

    return (
      <div className="container">
        <AddPostMutation variables={QUERY_VARIABLES}>
          <PostForm />
        </AddPostMutation>
        <PostsFeedQuery variables={QUERY_VARIABLES}>
          <FeedList />
        </PostsFeedQuery>
      </div>
    );
  }
}
