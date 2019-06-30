import React from 'react';
import { SetStateContext, StateContext } from '../utils/Context';

const shorten = (text) => {
  if (text.length > 12) {
    return text.substring(0, text.length - 9) + '...';
  }
  return text;
};

const usernamesToString = (users) => {
  const userList = users.slice(1);
  let usernamesString = '';
  for (let i = 0; i < userList.length; i++) {
    usernamesString += userList[i].username;
    if (i - 1 === userList.length) {
      usernamesString += ', ';
    }
  }
  return usernamesString;
};

const Chat = ({ chat }) => {
  const stateContext = React.useContext(StateContext);
  const setStateContext = React.useContext(SetStateContext);

  const addChat = (id) => {
    let { openChats } = stateContext;
    if (openChats.indexOf(id) === -1) {
      if (openChats.length > 2) {
        openChats = openChats.slice(1);
      }
      openChats.push(id);
    }
    const { setState } = setStateContext;
    setState({ openChats });
  };

  return (
    <div
      key={'chat' + chat.id}
      className="chat"
      onClick={() => addChat(chat.id)}
    >
      <div className="header">
        <img
          src={(chat.users.length > 2
            ? '/public/group.png'
            : chat.users[1].avatar)}
          alt="user-avatar"
        />
        <div>
          <h2>
            {shorten(usernamesToString(chat.users))}
          </h2>
          <span>
            {chat.lastMessage && shorten(chat.lastMessage.text)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chat;
