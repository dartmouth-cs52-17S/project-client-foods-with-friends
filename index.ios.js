import React, { Component } from 'react';

import { View, StyleSheet, AppRegistry } from 'react-native';
import Navigator from './navigator'

const styles = StyleSheet.create({
  container:  {
    flex: 1,
    alignSelf: 'stretch',
  },
});

class foodswithfriends extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Navigator />
      </View>
    );
  }
}

AppRegistry.registerComponent('foodswithfriends', () => foodswithfriends);
