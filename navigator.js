import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, StyleSheet, NavigatorIOS } from 'react-native';
import SignUp from './components/signup';
import Match from './components/match';
import SignIn from './components/signin';
import { signoutUser } from './actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

class Navigator extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.renderPage = this.renderPage.bind(this);
    this.moveToSignup = this.moveToSignup.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.auth !== nextProps.auth) {
  //     this.renderPage();
  //   }
  // }

  moveToSignup() {
    return (
      <View style={styles.container}>
        <NavigatorIOS
          style={styles.container}
          translucent={false}
          initialRoute={{
            title: 'Sign Up',
            component: SignUp,
          }}
        />
      </View>
    );
  }

  renderPage() {
    if (this.props.auth) {
      console.log(this.props.auth);
      return (
        <View style={styles.container}>
          <NavigatorIOS
            style={styles.container}
            translucent={false}
            initialRoute={{
              title: 'Get a Match!',
              component: Match,
              rightButtonTitle: 'Sign Out',
              onRightButtonPress: () => {
                this.props.signoutUser();
              },
            }}
          />
        </View>
      );
    } else {
      console.log('wtf');
      return (
        <View style={styles.container}>
          <NavigatorIOS
            style={styles.container}
            translucent={false}
            initialRoute={{
              title: 'Sign Up',
              component: SignIn,
            }}
          />
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
  }
);

const mapDispatchToProps = dispatch => (
  {
    signoutUser: () => dispatch(signoutUser()),
  }
);

export default (connect(mapStateToProps,
  mapDispatchToProps)(Navigator));
