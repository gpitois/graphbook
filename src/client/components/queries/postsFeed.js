import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Error from '../error';
import Loading from '../loading';

const GET_POSTS = gql`
  query postsFeed($page: Int, $limit: Int, $username: String) {
    postsFeed(page: $page, limit: $limit, username: $username) {
      posts {
        id
        text
        user {
          avatar
          username 
        }
      }
    }
  }
`;

export default class PostsFeedQuery extends Component {
  getVariables() {
    const { variables } = this.props;
    const queryVariables = {
      page: 0,
      limit: 10,
    };
    if (typeof variables !== typeof undefined) {
      if (typeof variables.page !== typeof undefined) {
        queryVariables.page = variables.page;
      }
      if (typeof variables.limit !== typeof undefined) {
        queryVariables.limit = variables.limit;
      }
      if (typeof variables.username !== typeof undefined) {
        queryVariables.username = variables.username;
      }
    }
    return queryVariables;
  }

  render() {
    const { children } = this.props;
    const variables = this.getVariables();
    return (
      <Query query={GET_POSTS} variables={variables}>
        {({ loading, error, data, fetchMore }) => {
          if (loading) return <Loading />;
          if (error) return <Error><p>{error.message}</p></Error>;
          const { postsFeed } = data;
          const { posts } = postsFeed;
          return React.Children.map(children, function (child) {
            return React.cloneElement(child, {
              posts,
              fetchMore,
            });
          });
        }}
      </Query>
    );
  }
}
