/*
Tab bar for match history page
*/

import React, { Component } from 'react';
import { StyleSheet, NavigatorIOS, Image } from 'react-native';

import MatchHistoryPage from '../containers/matchHistoryPage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class MatchHistory extends Component {
  static navigationOptions = {
    tabBarLabel: 'My Matches',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../imgs/list-menu.png')}
      />
   ),
  };

  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MatchHistoryPage,
          title: 'My Matches',
          translucent: false,
          passProps: {},
        }}
        style={styles.container}
        barTintColor="#f3f3f3"
        tintColor="#008888"
      />
    );
  }
}

export default MatchHistory;
