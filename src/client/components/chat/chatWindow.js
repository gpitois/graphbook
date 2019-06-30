import React from 'react';
import { SetStateContext, StateContext } from '../utils/Context';
import AddMessageMutation from '../mutations/addMessage';
import MessageInput from './messageInput';

const Header = ({ chat }) => {
  const stateContext = React.useContext(StateContext);
  const setStateContext = React.useContext(SetStateContext);

  const closeChat = (id) => {
    let { openChats } = stateContext;
    const { setState } = setStateContext;
    openChats = openChats.slice();
    const index = openChats.indexOf(id);
    openChats.splice(index, 1);
    setState({ openChats });
  };

  return (
    <div className="header">
      <span>{chat.users[1].username}</span>
      <button
        className="close"
        onClick={() => closeChat(chat.id)}
      >
        X
      </button>
    </div>
  );
};

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

const ChatWindow = ({ chat }) => (
  <div className="chatWindow">
    <Header chat={chat} />
    <ChatMessageFeed chat={chat} />
    <AddMessageMutation chatId={chat.id}>
      <MessageInput />
    </AddMessageMutation>
  </div>
);

export default ChatWindow;
