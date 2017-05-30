import React, { Component } from 'react';
import { NavigatorIOS, Image } from 'react-native';

import ProfilePage from '../containers/profilePage';
import EditProfile from '../containers/editProfilePage';

class Profile extends Component {
  static navigationOptions = {
    tabBarLabel: 'Profile',
    tabBarIcon: ({ tintColor }) => (
      <Image
        source={require('../imgs/avatar.png')}
      />
   ),
  };
  render() {
    return (
      <NavigatorIOS
        ref="nav"
        translucent={false}
        initialRoute={{
          component: ProfilePage,
          title: 'My Profile',
          translucent: false,
          rightButtonIcon: require('../imgs/editUser.png'),
          onRightButtonPress: () => {
            this.refs.nav.push({
              title: 'Edit Interests',
              component: EditProfile,
            });
          },
        }}
        style={{ flex: 1, alignSelf: 'stretch' }}
        barTintColor="#f3f3f3"
        tintColor="#008888"
      />
    );
  }
}

export default Profile;
