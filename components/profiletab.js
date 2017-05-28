import React, { Component } from 'react';
import { NavigatorIOS } from 'react-native';

import ProfilePage from '../containers/profilePage';
import EditProfile from '../containers/editProfilePage';


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
          rightButtonTitle: 'Edit',
          onRightButtonPress: () => {
            // console.log('hello'),
            this.refs.nav.push({
              title: 'Edit Interests',
              leftButtonTitle: ' ',
              component: EditProfile,
            });
          },
        }}
        style={{ flex: 1, alignSelf: 'stretch' }}
      />
    );
  }
}
