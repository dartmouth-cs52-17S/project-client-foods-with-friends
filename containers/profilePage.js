import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, TouchableHighlight, StyleSheet, Text, FlatList, ScrollView, List } from 'react-native';

import { signoutUser, clearError, pullProfile } from '../actions';
import EditProfile from './editProfilePage';

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgb(199, 199, 199)',
  },
  username: {
    marginTop: 5,
    fontSize: 30,
    color: '#519bdd',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next',
  },
  header: {
    height: 220,
    backgroundColor: 'rgb(178, 247, 235)',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgb(165, 236, 223)',
    borderWidth: 5,
  },
  info: {
    height: 250,
    backgroundColor: 'rgb(255, 255, 255)',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 5, height: 6 },
    shadowRadius: 1,
    shadowOpacity: 0.3,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Avenir Next',
  },
  interest: {
    textAlign: 'center',
    margin: 3,
    fontSize: 14,
    fontFamily: 'Avenir Next',
  },
  image: {
    width: 90,
    height: 90,
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 4,
    borderRadius: 45,
  },
  button: {
    marginTop: 15,
    alignSelf: 'center',
    backgroundColor: '#c65353',
    width: 70,
    height: 30,
    borderWidth: 2,
    borderColor: '#823429',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 1,
  },
});

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.onPressButton = this.onPressButton.bind(this);
    this.edit = this.edit.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
  }

  componentDidMount() {
    this.props.pullProfile();
  }

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
          <View style={styles.header}>
            <Image
              style={styles.image}
              source={require('../imgs/user-1.png')}
            />
            <Text style={styles.username}>{this.props.user.fullname}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.title}>Interests:</Text>
            <ScrollView>
              <FlatList
                key={this.props.user.interests}
                removeClippedSubviews={false}
                data={this.props.user.interests}
                renderItem={({ item }) => <Text style={styles.interest}>{item}</Text>}
              />
            </ScrollView>
          </View>
          <TouchableHighlight style={styles.button} onPress={this.onPressButton}>
            <Text>Sign Out</Text>
          </TouchableHighlight>
        </View>
      );
    } else {
      return (
        <View style={styles.body}>
          <Text>Loading...</Text>
          <TouchableHighlight style={styles.button} onPress={this.onPressButton}>
            <Text>Sign Out</Text>
          </TouchableHighlight>
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
