import React, { Component } from 'react';
import { NavigatorIOS } from 'react-native';

import ProfilePage from '../containers/profile';

export default class Profile extends Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
  };
  render() {
    return (
      <NavigatorIOS
        translucent={false}
        initialRoute={{
          component: ProfilePage,
          title: 'My Profile',
        }}
        style={{ flex: 1, alignSelf: 'stretch' }}
      />
    );
  }
}
