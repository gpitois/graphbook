import React, { Component } from 'react';

import ChatsFeedQuery from './components/queries/chatsFeed';
import ChatList from './components/chat/chatList';
import OpenChats from './components/chat/openChats';

export default class Chats extends Component {

  render() {
    return (
      <div className="wrapper">
        <ChatsFeedQuery>
          <ChatList />
        </ChatsFeedQuery>
        <OpenChats />
      </div>
    );
  }
};
