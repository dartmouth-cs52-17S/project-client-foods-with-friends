import React, { Component } from 'react';
import { NavigatorIOS } from 'react-native';

import ChatHistoryPage from '../containers/chatHistoryPage';

class ChatHistory extends Component {
  static navigationOptions = {
    tabBarLabel: 'Chat',
  };
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: ChatHistoryPage,
          title: 'Chat',
        }}
        style={{ flex: 1 }}
      />
    );
  }
}

export default ChatHistory;
