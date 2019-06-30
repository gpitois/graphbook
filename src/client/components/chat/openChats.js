import React from 'react';

import { StateContext } from '../utils/Context';
import Chat from '../queries/chat';

const OpenChats = () => {
  const stateContext = React.useContext(StateContext);
  const { openChats } = stateContext;

  return (
    <div className="openChats">
      {openChats &&
        openChats.map((chatId) => <Chat key={'chat' + chatId} chatId={chatId} />)
      }
    </div>
  );
};

export default OpenChats;
