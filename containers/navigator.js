import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet } from 'react-native';
import SignUp from './signup';
import SignIn from './signin';
import { signoutUser } from '../actions';
import MunchBuddyTabs from '../components/tab';
import ProfileAdd from './profileAdd';

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
  }

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
