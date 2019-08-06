import React, { Component } from 'react';

import PostsFeedQuery from './components/queries/postsFeed';
import AddPostMutation from './components/mutations/addPost';
import FeedList from './components/post/feedlist';
import PostForm from './components/post/form';

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
