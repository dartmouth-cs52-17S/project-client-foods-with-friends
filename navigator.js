import React, { Component } from 'react';

import { View, StyleSheet, AppRegistry, NavigatorIOS } from 'react-native';
import SignUp from './components/signup';

const styles = StyleSheet.create({
  container: {
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
            title: 'Sign Up',
            component: SignUp,
          }}
        />
      </View>
    );
  }
}

module.exports = Navigator;
