/*
This is the chat page that connects to the socket so the user can
send messages to the people they matched with
*/

import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 200,
    marginBottom: 63,
    alignSelf: 'stretch',
  },
});

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };

    this.matchedUserID = this.props.User;
    this.myUserID = '';
    this.roomID = '';
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.onReceivedExistingMessage = this.onReceivedExistingMessage.bind(this);
    this.convertUserFormat = this.convertUserFormat.bind(this);

    this.socket = SocketIOClient('https://munchbuddy.herokuapp.com');
    this.socket.on('message', this.onReceivedMessage);
    this.socket.on('exisitingMsgsResult', this.onReceivedExistingMessage);
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((response) => {
      if (response !== null) {
        const User = response;

        // connect to socket
        this.socket.on('connect', () => {
          this.socket
              .emit('hello', 'HELLO FROM CLIENT')
              .emit('authenticate', { token: User }) // send the jwt token
              .on('authenticated', () => {
                this.socket.on('getMyUserID', (id) => {
                  this.myUserID = id;
                  this.socket.emit('getExistingMsgs', this.matchedUserID);
                });
              })
              .on('unauthorized', (msg) => {
                throw new Error(msg.data.type);
              });
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  // Event listeners
  onReceivedExistingMessage(result) {
    this.roomID = result.roomID;
    this.onReceivedMessage(result.messages);
  }
  /**
   * On receiving a message from the server.
   */
  onReceivedMessage(messages) {
    const convertedMsg = this.convertUserFormat(messages);
    console.log(`storing message: ${JSON.stringify(convertedMsg)}`);
    this._storeMessages(convertedMsg);
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend(messages = []) {
    const formatedTime = messages[0].createdAt.toISOString();
    const msgToSend = messages[0];
    msgToSend.createdAt = formatedTime;
    msgToSend.roomID = this.roomID;
    this.socket.emit('message', msgToSend);
    this._storeMessages(messages);
  }

  // Format the user format in message to be user {_id} so giftedChat can show
  convertUserFormat(messages) {
    const convertedMsg = messages;
    for (let i = 0; i < convertedMsg.length; i += 1) {
      convertedMsg[i].user = { _id: messages[i].user, name: 'Hello', avatar: 'https://cdn1.iconfinder.com/data/icons/fruitix-circular/125/apple-256.png' };
    }
    return convertedMsg;
  }

  // Helper function
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <GiftedChat
          bottomOffset={48}
          messages={this.state.messages}
          onSend={this.onSend}
          user={{
            _id: this.myUserID,
          }}
        />
      </View>
    );
  }
}

export default ChatPage;
