/*
This is the profile page for the people the user has been matched with
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, StyleSheet, Text, FlatList, ScrollView, AlertIOS } from 'react-native';

import { pullOtherProfile } from '../actions';
import EditProfile from './editProfilePage';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#ffffff',
  },
  username: {
    marginTop: 5,
    fontSize: 35,
    color: '#ffffff',
  },
  header: {
    height: 220,
    backgroundColor: '#53c5bb',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#53c5bb',
    borderWidth: 5,
  },
  info: {
    height: 200,
    backgroundColor: '#519bdd',
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 6 },
    shadowRadius: 1,
    shadowOpacity: 0.3,
  },
  title: {
    marginTop: 10,
    color: 'white',
    fontSize: 30,
  },
  scroll: {
    marginTop: 0,
  },
  interest: {
    textAlign: 'center',
    margin: 3,
    fontSize: 20,
    color: '#ffffff',
  },
  image: {
    width: 90,
    height: 90,
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 4,
    borderRadius: 45,
  },
  list: {
    margin: 20,
  },
});

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.edit = this.edit.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
  }

  componentDidMount() {
    this.props.pullProfile(this.props.User);
  }

  // take the user to the edit Profile page to edit their info
  edit() {
    this.props.navigator.push({
      title: 'Edit Interests',
      leftButtonTitle: ' ',
      component: EditProfile,
    });
  }

  // render the users profile once the information has been accessed
  renderProfile() {
    if (this.props.user && this.props.user !== null) {
      return (
        <View style={styles.body}>
          <View style={styles.header}>
            <Image
              style={styles.image}
              source={this.props.user.profile_image}
            />
            <Text style={styles.username}>{this.props.user.fullname}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>Interests:</Text>
            <ScrollView style={styles.scroll}>
              <FlatList
                style={styles.list}
                key={this.props.user.interests}
                removeClippedSubviews={false}
                data={this.props.user.interests}
                renderItem={({ item }) => <Text style={styles.interest}>{item}</Text>}
              />
            </ScrollView>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.body}>
          <Text>Loading...</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.body}>
        {this.renderProfile()}
      </View>
    );
  }
}

const mapStateToProps = state => (
  {
    user: state.auth.otherUser,
  }
);

const mapDispatchToProps = dispatch => (
  {
    pullProfile: id => dispatch(pullOtherProfile(id)),
  }
);

export default (connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
