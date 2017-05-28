import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableHighlight, StyleSheet, Text, FlatList, ScrollView, List } from 'react-native';

import { signoutUser, clearError, pullProfile } from '../actions';
import EditProfile from './editProfilePage';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignSelf: 'stretch',
  },
  image: {
    width: 250,
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 125,
  },
  imageView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  username: {
    marginTop: 5,
    fontSize: 30,
    color: '#519bdd',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Avenir Next',
  },
  interest: {
    textAlign: 'center',
    margin: 3,
    fontSize: 14,
    fontFamily: 'Avenir Next',
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
  },
});

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onPressButton = this.onPressButton.bind(this);
    this.edit = this.edit.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
  }

  componentDidMount() {
    this.props.pullProfile();
  }
  //
  // componentWillUnmount() {
  //   clearInterval(this.pull);
  // }

  onPressButton() {
    this.props.signoutUser();
    this.props.clearError();
  }

  edit() {
    this.props.navigator.push({
      title: 'Edit Interests',
      leftButtonTitle: ' ',
      component: EditProfile,
    });
  }

  renderProfile() {
    if (this.props.user && this.props.user !== null) {
      return (
        <View style={styles.body}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={{ uri: 'https://image.freepik.com/free-icon/business-person-silhouette-wearing-tie_318-49988.jpg' }}
            />
            <Text style={styles.username}>{this.props.user.fullname}</Text>
            <Text style={styles.title}>Interests:</Text>
            <FlatList
              removeClippedSubviews={false}
              data={this.props.user.interests}
              renderItem={({ item }) => <Text style={styles.interest}>{item}</Text>}
            />
            <TouchableHighlight style={styles.button} onPress={this.onPressButton}>
              <Text>Sign Out</Text>
            </TouchableHighlight>
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
      <ScrollView>
        <View style={styles.body}>
          {this.renderProfile()}
        </View>
      </ScrollView>
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
