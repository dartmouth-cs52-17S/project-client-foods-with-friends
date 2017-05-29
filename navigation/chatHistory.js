import React, { Component } from 'react';
import { NavigatorIOS, Image } from 'react-native';

import ChatHistoryPage from '../containers/chatHistoryPage';
import ChatPage from '../components/chatPage';

class ChatHistory extends Component {
  static navigationOptions = {
    tabBarLabel: 'Chat',
    // tabBarVisible: false,
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../imgs/speech-bubble.png')}
      />
   ),
  };
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: ChatPage,
          title: 'Chat',
          translucent: false,
          passProps: { style: { flex: 1 } },
        }}
        style={{ flex: 1 }}
      />
    );
  }
}

export default ChatHistory;
