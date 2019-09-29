import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Error from '../error';
import Loading from '../loading';

const GET_CHATS = gql`{
  chats {
    id 
    users {
      id
      avatar
      username
    }
    lastMessage {
      text 
    }
  } 
}
`;

export default class ChatsQuery extends Component {
  render() {
    const { children } = this.props;
    return (
      <Query query={GET_CHATS}>
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <Loading />;
          if (error) return <Error><p>{error.message}</p></Error>;
          const { chats } = data;
          return React.Children.map(children, function (child) {
            return React.cloneElement(child, {
              chats,
              subscribeToMore,
            });
          });
        }}
      </Query>
    );
  }
}
