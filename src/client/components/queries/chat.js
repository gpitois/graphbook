import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import ChatWindow from '../chat/chatWindow';

import Loading from '../loading';
import Error from '../error';

const GET_CHAT = gql`
  query chat($chatId: Int!) {
    chat(chatId: $chatId) {
      id
      users { 
        id
        avatar
        username
      }
      messages { 
        id
        text 
        user {
          id
        }
      } 
    }
  }
`;

const Chat = ({ chatId }) => (
  <Query
    key={'chatWindow' + chatId}
    query={GET_CHAT}
    variables={{ chatId }}
  >
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return <Error><p>{error.message}</p></Error>;
      const { chat } = data;
      return (
        <ChatWindow chat={chat} />
      );
    }}
  </Query>
);

export default Chat;
