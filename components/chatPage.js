import React from 'react';
import { StyleSheet, View, ScrollView, AsyncStorage, TextInput } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'rgb(242, 105, 84)',
    height: 200,
    marginBottom: 63,
    alignSelf: 'stretch',
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
          roomID: 1,
        },
      ],
    };

  // NOTE: Hard code a matched person here.
  // HACK: Please fill in the matchedUserID here
    this.matchedUserID = '5928deae7cb4d4216ad6580e';
    this.myUserID = '';
    this.roomID = '';
    // this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);
    this.onReceivedExistingMessage = this.onReceivedExistingMessage.bind(this);
    this.convertUserFormat = this.convertUserFormat.bind(this);

    this.socket = SocketIOClient('http://localhost:9090');

    // this.socket = SocketIOClient('https://munchbuddy.herokuapp.com');
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
    console.log(`onReceivedExistingMessage ${JSON.stringify(result)}`);
    this.roomID = result.roomID;

    this.onReceivedMessage(this.convertUserFormat(result.messages));
  }
  /**
   * When the server sends a message to this.
   */
  onReceivedMessage(messages) {
    console.log(`onReceivedMessage ${JSON.stringify(messages)}`);
    this._storeMessages(messages);
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
      convertedMsg[i].user = { _id: messages[i].user };
    }
    console.log(`roomID = ${this.roomID}, convertedMsg = ${JSON.stringify(convertedMsg)}`);
    return convertedMsg;
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
