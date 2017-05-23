import React, { Component } from 'react';
import {
  NavigatorIOS,
} from 'react-native';

import ProfilePage from './components/profile';

export default class Profile extends Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
  };
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: ProfilePage,
          title: 'Matches!!',
        }}
        style={{ flex: 1 }}
      />
    );
  }
}
