/*
Decides what page to load first. If the user is not authenticated, render signin/signup pages.
If the user is authenticated, take them immediately to the main home page
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import SocketIOClient from 'socket.io-client';
import SignUp from '../containers/signup';
import SignIn from '../containers/signin';
import { signoutUser } from '../actions';
import MunchBuddyTabs from './tab';
import ProfileAdd from '../containers/profileAdd';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

class Navigator extends Component {
  constructor(props) {
    super(props);
    this.state = { title: 'Sign Up', component: SignUp };

    this.renderPage = this.renderPage.bind(this);
    this.socket = SocketIOClient('https://munchbuddy.herokuapp.com');
    this.socket.emit('hello', 'Hello from client side');
  }

  // render the view based on whether the user is authenticated
  // and whether the user wants to sign in or sign up
  renderPage() {
    if (this.props.auth && !this.props.page) {
      return (
        <View style={styles.container}>
          <MunchBuddyTabs />
        </View>
      );
    } else if (this.props.auth && this.props.page) {
      return (
        <View style={styles.container}>
          <ProfileAdd />
        </View>
      );
    } else if (!this.props.auth && !this.props.page) {
      return (
        <View style={styles.container}>
          <SignIn />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SignUp />
        </View>
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderPage()}
      </View>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth.authenticated,
    page: state.auth.page,
  }
);

const mapDispatchToProps = dispatch => (
  {
    signoutUser: () => dispatch(signoutUser()),
  }
);

export default (connect(mapStateToProps,
  mapDispatchToProps)(Navigator));
