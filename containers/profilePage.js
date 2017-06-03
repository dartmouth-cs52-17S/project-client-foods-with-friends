/*
The user's profile page
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableOpacity, StyleSheet, Text, FlatList, ScrollView } from 'react-native';

import { signoutUser, clearError, pullProfile } from '../actions';

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
  button: {
    marginTop: 25,
    alignSelf: 'center',
    backgroundColor: '#da2a29',
    width: 100,
    height: 45,
    borderWidth: 2,
    borderColor: '#da2a29',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 1,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  list: {
    margin: 20,
  },
});

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.onPressButton = this.onPressButton.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
  }

  componentDidMount() {
    this.props.pullProfile();
  }

  // sign out button
  onPressButton() {
    this.props.signoutUser();
    this.props.clearError();
  }

  // render the profile once the user's information has been accessed
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
          <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.body}>
          <Text>Loading...</Text>
          <TouchableOpacity style={styles.button} onPress={this.onPressButton}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
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
    user: state.auth.user,
  }
);

const mapDispatchToProps = dispatch => (
  {
    signoutUser: () => dispatch(signoutUser()),
    clearError: () => dispatch(clearError()),
    pullProfile: () => dispatch(pullProfile()),
  }
);

export default (connect(mapStateToProps, mapDispatchToProps)(ProfilePage));
