import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';


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

const ADD_MESSAGE = gql`
  mutation addMessage($message : MessageInput!) {
    addMessage(message : $message) {
      id
      text
      user {
        id 
      }
    }
  }
`;

export default class AddMessageMutation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
    };
  }

  onChangeChatInput = (event, id) => {
    event.preventDefault();
    const input = event.target.value;
    this.setState({ textInput : input });
  };

  handleKeyPress = (event, id, addMessage) => {
    const self = this;
    var input = this.state.textInput;
    if (event.key === 'Enter' && input.length) {
      addMessage({
        variables: {
          message: {
            text: input,
            chatId: id
          }
        }
      })
        .then(() => {
          self.setState({ textInput : ''});
        });
    }
  };

  render() {
    const self = this;
    const { chatId, children } = this.props;
    const { textInput } = this.state;
    return (
      <Mutation
        mutation={ADD_MESSAGE}
        update={(store, { data: { addMessage } }) => {
          const data = store.readQuery({
            query: GET_CHAT,
            variables: { chatId: chatId}
          });
          data.chat.messages.push(addMessage);
          store.writeQuery({
            query: GET_CHAT,
            variables: { chatId: chatId },
            data
          });
        }}
      >
        {addMessage =>
          React.Children.map(children, function (child) {
            return React.cloneElement(
              child,
              {
                addMessage,
                textInput,
                onChangeChatInput: self.onChangeChatInput,
                handleKeyPress: self.handleKeyPress,
                chatId: chatId
              });
          })}
      </Mutation>
    )
  }
}
