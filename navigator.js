import React, { Component } from 'react';

import { View, StyleSheet, AppRegistry, NavigatorIOS } from 'react-native';
import Profile from './components/profile'

const styles = StyleSheet.create({
  container:  {
    flex: 1,
    alignSelf: 'stretch',
  },
});

class Navigator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <NavigatorIOS
          style={styles.container}
          translucent={false}
          initialRoute={{
            title: 'HI',
            component: Profile,
          }}
        />
      </View>
    );
  }
}

module.exports = Navigator;
