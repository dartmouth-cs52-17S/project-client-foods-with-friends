import React, { Component } from 'react';
import { NavigatorIOS, Image } from 'react-native';

import MatchPage from '../containers/matchPage';

class Match extends Component {
  static navigationOptions = {
    tabBarLabel: 'Match',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../imgs/cutlery-crossed.png')}
      />
   ),
  };

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MatchPage,
          title: 'Get Matched',
          translucent: false,
        }}
        style={{ flex: 1 }}
        barTintColor="#f3f3f3"
      />
    );
  }
}

export default Match;
