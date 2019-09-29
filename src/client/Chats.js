import React, { Component } from 'react';

import ChatsQuery from './components/queries/chatsQuery';
import ChatQuery from './components/queries/chatQuery';
import ChatsList from './components/chat/chatList';
import ChatWindow from './components/chat/chatWindow';

export default class Chats extends Component {
  state = {
    openChats: [],
  };

  openChat = (id) => {
    var openChats = this.state.openChats.slice();

    if(openChats.indexOf(id) === -1) {
      if(openChats.length > 2) {
        openChats = openChats.slice(1);
      }
      openChats.push(id);
    }

    this.setState({ openChats });
  };

  closeChat = (id) => {
    var openChats = this.state.openChats.slice();

    const index = openChats.indexOf(id);
    openChats.splice(index,1);

    this.setState({ openChats });
  };

  render() {
    const { user } = this.props;
    const { openChats } = this.state;

    return (
      <div className="wrapper">
        <ChatsQuery>
          <ChatsList openChat={this.openChat} user={user}/>
        </ChatsQuery>
        <div className="openChats">
          {openChats.map((chatId, i) =>
            <ChatQuery key={"chatWindow" + chatId} chatId={ chatId }>
              <ChatWindow closeChat={this.closeChat} user={user}/>
            </ChatQuery>
          )}
        </div>
      </div>
    )
  }
}
