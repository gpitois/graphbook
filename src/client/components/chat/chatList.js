import React, { Component } from 'react';

import Chat from '.';

export default class ChatList extends Component {
  render() {
    const { chats } = this.props;
    return (
      <div className="chats">
        {chats.map(chat => <Chat key={chat.id} chat={chat} />)}
      </div>
    );
  }
}
