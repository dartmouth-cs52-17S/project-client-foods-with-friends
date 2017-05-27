import React, { Component } from 'react';
import { NavigatorIOS, Image } from 'react-native';

import MatchPage from '../containers/matchPage';

class Match extends Component {
  static navigationOptions = {
    tabBarLabel: 'Match',
  //   tabBarIcon: ({ tintColor }) => (
  //     <Image
  //       source={require('../imgs/match.png')}
  //     />
  //  ),
  };

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MatchPage,
          title: 'Get Matched',
          translucent: 'false',
        }}
        style={{ flex: 1 }}
      />
    );
  }
}

export default Match;
