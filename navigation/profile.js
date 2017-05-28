import React, { Component } from 'react';
import { NavigatorIOS, Image } from 'react-native';

import ProfilePage from '../containers/profilePage';
import EditProfile from '../containers/editProfilePage';

class Profile extends Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
  //   tabBarIcon: ({ tintColor }) => (
  //     <Image
  //       source={require('../imgs/profile.png')}
  //     />
  //  ),
  };
  render() {
    return (
      <NavigatorIOS
        ref="nav"
        translucent={false}
        initialRoute={{
          component: ProfilePage,
          title: 'My Profile',
          rightButtonTitle: 'Edit',
          onRightButtonPress: () => {
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

export default Profile;
