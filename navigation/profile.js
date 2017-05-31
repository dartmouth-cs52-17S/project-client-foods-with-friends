/*
Tab bar for profile page
*/

import React, { Component } from 'react';
import { NavigatorIOS, StyleSheet, Image } from 'react-native';

import ProfilePage from '../containers/profilePage';
import EditProfile from '../containers/editProfilePage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

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
              title: 'Edit Profile',
              component: EditProfile,
            });
          },
        }}
        style={styles.container}
        barTintColor="#f3f3f3"
        tintColor="#008888"
      />
    );
  }
}

export default Profile;
