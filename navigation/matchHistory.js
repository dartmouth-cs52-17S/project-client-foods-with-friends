import React, { Component } from 'react';
import { NavigatorIOS, Image } from 'react-native';

import MatchHistoryPage from '../containers/matchHistoryPage';

class MatchHistory extends Component {
  static navigationOptions = {
    tabBarLabel: 'Match',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../imgs/match-history.png')}
      />
   ),
  };
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MatchHistoryPage,
          title: 'Match History',
        }}
        style={{ flex: 1 }}
      />
    );
  }
}

export default MatchHistory;
