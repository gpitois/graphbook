import React, { Component } from 'react';
import PostsQuery from '../queries/postsFeed';
import FeedList from '../post/feedlist';
import UserHeader from './header';
import UserQuery from '../queries/userQuery';

export default class UserProfile extends Component {
  render() {
    const QUERY_VARIABLES = {
      page: 0,
      limit: 10,
      username: this.props.username
    };
    return (
      <div className="user">
        <div className="inner">
          <UserQuery variables={{ username: this.props.username }}>
            <UserHeader />
          </UserQuery>
        </div>
        <div className="container">
          <PostsQuery variables={QUERY_VARIABLES}>
            <FeedList />
          </PostsQuery>
        </div>
      </div>
    )
  }
}
