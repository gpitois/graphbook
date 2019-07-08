import React, { Component } from 'react';
import AddMessageMutation from '../mutations/addMessage';
import MessageInput from './messageInput';

const ChatMessageFeed = ({ chat }) => (
  <div className="messages">
    {chat.messages.map((message, j) =>
      <div
        key={'message' + message.id}
        className={'message ' + (message.user.id > 1 ? 'left' : 'right')}
      >
        {message.text}
      </div>
    )}
  </div>
);

class ChatWindow extends Component {
  render() {
    const { chat, closeChat, user } = this.props;
    return (
      <div className="chatWindow">
        <div className="header">
          <span>{chat.users[1].username}</span>
          <button
            className="close"
            onClick={() => closeChat(chat.id)}
          >
            X
          </button>
        </div>
        <ChatMessageFeed chat={chat} />
        <AddMessageMutation chatId={chat.id}>
          <MessageInput />
        </AddMessageMutation>
      </div>
    );
  }
}

export default ChatWindow;
