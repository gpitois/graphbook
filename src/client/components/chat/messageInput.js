import React from 'react';

const MessageInput = ({ addMessage, textInput, onChangeChatInput, handleKeyPress, chatId }) => (
  <div className="input">
    <input
      type="text"
      value={textInput}
      onChange={
        event => onChangeChatInput(event, chatId)
      }
      onKeyPress={
        event => handleKeyPress(event, chatId, addMessage)
      }
    />
  </div>
);

export default MessageInput;
