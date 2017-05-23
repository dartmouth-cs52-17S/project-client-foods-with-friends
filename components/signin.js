import React from 'react';
import { connect } from 'react-redux';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';

import Match from './match';
import SignUp from './signup';
import { signinUser, signoutUser } from '../actions';

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
    backgroundColor: '#519bdd',
    borderRadius: 5,
    borderWidth: 0,
    width: 150,
    height: 60,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  TextInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonBox: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signinBox: {
    flex: 1,
    alignSelf: 'stretch',
  },
  signin: {
    alignSelf: 'center',
  },
  signupText: {
    textDecorationLine: 'underline',
  },
  error: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: -250,
  },
  errorMessage: {
    color: 'red',
  },
});

class SignIn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.renderError = this.renderError.bind(this);
    this.signin = this.signin.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.auth === true) {
      this.signin();
    }
  }

  signin() {
    this.props.navigator.push({
      title: 'Match Me',
      leftButtonTitle: ' ',
      rightButtonTitle: 'Sign Out',
      onRightButtonPress: () => { this.props.signoutUser(); this.handleSignup(); },
      component: Match,
      passProps: { },
    });
  }

  updateEmail(text) {
    this.setState({
      email: text,
    });
  }

  updatePassword(text) {
    this.setState({
      password: text,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signinUser(user);
    if (this.props.auth === true) {
      this.signin();
    }
  }

  handleCancel(event) {
    console.log('handle cancel');
    event.preventDefault();
    this.setState({
      email: '',
      password: '',
      fullname: '',
    });
  }

  handleSignup() {
    this.props.navigator.push({
      title: 'Sign Up',
      component: SignUp,
      passProps: { },
    });
  }

  renderError() {
    if (this.props.error === null) {
      return <View />;
    } else {
      return <View><Text style={styles.errorMessage}>{this.props.error}</Text></View>;
    }
  }

  render(props) {
    return (
      <View style={styles.container}>
        <Text style={styles.timeLabel}>Sign In!</Text>
        <TextInput style={styles.TextInput} placeholder={'Email'} onChangeText={this.updateEmail} value={this.state.email} />
        <TextInput id={'password'} style={styles.TextInput} type={'Password'} placeholder={'password'} onChangeText={this.updatePassword} value={this.state.password} />
        <View style={styles.error}>
          {this.renderError()}
        </View>
        <View style={styles.buttonBox}>
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
            <Text> Submit! </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this.handleCancel}>
            <Text> cancel </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.signinBox}>
          <TouchableHighlight style={styles.signin} onPress={this.handleSignup}>
            <Text style={styles.signupText}> Need a new account? Sign up here </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => (
  {
    error: state.auth.message,
    auth: state.auth.authenticated,
  }
);

const mapDispatchToProps = dispatch => (
  {
    signinUser: ({ email, password }) => dispatch(signinUser({ email, password })),
    signoutUser: () => dispatch(signoutUser()),
  }
);

export default (connect(mapStateToProps,
  mapDispatchToProps)(SignIn));
