/*
tab bar for the match page
*/

import React, { Component } from 'react';
import { StyleSheet, NavigatorIOS, Image } from 'react-native';

import MatchPage from '../containers/matchPage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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
        style={styles.container}
        barTintColor="#f3f3f3"
        tintColor="#008888"
      />
    );
  }
}

export default Match;
