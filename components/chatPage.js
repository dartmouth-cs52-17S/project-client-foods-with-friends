import React from 'react';
import axios from 'axios';
import { StyleSheet, View, ScrollView, AsyncStorage, TextInput } from 'react-native';
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

  // NOTE: Hard code a matched person here.
  // HACK: Please fill in the matchedUserID here
    console.log(this.props.User);
    this.matchedUserID = this.props.User;
    this.myUserID = '';
    this.roomID = '';
    // this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.onReceivedExistingMessage = this.onReceivedExistingMessage.bind(this);
    this.convertUserFormat = this.convertUserFormat.bind(this);

    // this.socket = SocketIOClient('http://localhost:9090');

    this.socket = SocketIOClient('https://munchbuddy.herokuapp.com');
    this.socket.on('message', this.onReceivedMessage);
    this.socket.on('exisitingMsgsResult', this.onReceivedExistingMessage);
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((response) => {
      console.log(`in chat page socket io token = ${response}`);
      if (response !== null) {
        const User = response;
        this.socket.on('connect', () => {
          this.socket
              .emit('hello', 'HELLO FROM CLIENT')
              .emit('authenticate', { token: User }) // send the jwt token
              .on('authenticated', () => {
                console.log('Yo, i am authorized in chat page!');
                this.socket.on('getMyUserID', (id) => {
                  console.log(`In get my user ID event, my id = ${id}`);
                  this.myUserID = id;
                  this.socket.emit('getExistingMsgs', this.matchedUserID);
                });
              })
              .on('unauthorized', (msg) => {
                console.log(`unauthorized: ${JSON.stringify(msg.data)}`);
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
   * When the server sends a message to this.
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
    // this.socket.emit('message', messages[0]);
    // TODO: Unify the dateofTime for giftedChat and mongoose
    const formatedTime = messages[0].createdAt.toISOString();
    const msgToSend = messages[0];
    msgToSend.createdAt = formatedTime;
    msgToSend.roomID = this.roomID;
    console.log(`In onSend, message = ${messages[0].text}, userID = ${messages[0].user._id}, createdAt = ${messages[0].createdAt}, formattedTime = ${formatedTime}, rooomID = ${msgToSend.roomID}`);
    this.socket.emit('message', msgToSend);
    this._storeMessages(messages);
  }

  // HACK: Format the user format in message to be user {_id} so giftedChat can show
  convertUserFormat(messages) {
    const convertedMsg = messages;
    for (let i = 0; i < convertedMsg.length; i += 1) {
      convertedMsg[i].user = { _id: messages[i].user, name: 'Hello', avatar: 'https://cdn1.iconfinder.com/data/icons/fruitix-circular/125/apple-256.png' };
    }
    console.log(`roomID = ${this.roomID}, convertedMsg = ${JSON.stringify(convertedMsg)}`);
    return convertedMsg;
  }

  // Helper functions
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    // const user = AsyncStorage.getItem('token');

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
