import React from 'react';
import { StyleSheet, View, ScrollView, Text, AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

const USER_ID = '@userId';

const styles = StyleSheet.create({
  chat: {
    flex: 1,
    marginBottom: 300,
  },
});

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        },
      ],
    };

    // this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);


    this.socket = SocketIOClient('http://localhost:9090');

    // this.socket = SocketIOClient('https://munchbuddy.herokuapp.com');
    this.socket.on('message', this.onReceivedMessage);
    // this.determineUser();
  }

  // Event listeners
  /**
   * When the server sends a message to this.
   */
  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }

  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend(messages = []) {
    // this.socket.emit('message', messages[0]);
    this.socket.emit('hello', 'messages[0]');
    this._storeMessages(messages);
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
  /**
   * When a user joins the chatroom, check if they are an existing user.
   * If they aren't, then ask the server for a userId.
  //  * Set the userId to the component's state.
  //  */
  // determineUser() {
  //   AsyncStorage.getItem(USER_ID)
  //     .then((userId) => {
  //       // If there isn't a stored userId, then fetch one from the server.
  //       if (!userId) {
  //         this.socket.emit('userJoined', null);
  //         this.socket.on('userJoined', (userId) => {
  //           AsyncStorage.setItem(USER_ID, userId);
  //           this.setState({ userId });
  //         });
  //       } else {
  //         this.socket.emit('userJoined', userId);
  //         this.setState({ userId });
  //       }
  //     })
  //     .catch(e => alert(e));
  // }


  // Helper functions
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }

  render() {
    const user = AsyncStorage.getItem('token');

    return (
      <GiftedChat
        style={styles.chat}
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 4,
        }}
      />
    );
  }


}

export default ChatPage;
