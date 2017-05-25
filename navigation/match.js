import React, { Component } from 'react';
import { NavigatorIOS } from 'react-native';

import MatchPage from '../containers/matchPage';

class Match extends Component {
  static navigationOptions = {
    tabBarLabel: 'Match',
  };
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MatchPage,
          title: 'Get Matched',
        }}
        style={{ flex: 1 }}
      />
    );
  }
}

export default Match;
