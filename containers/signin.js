import React from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native';

import Match from './match';
import { signinUser, signoutUser, clearError, goToSignup } from '../actions';

const styles = StyleSheet.create({
  error: {
    flex: 1,
    alignSelf: 'stretch',
    marginBottom: -250,
    marginTop: 50,
  },
  errorMessage: {
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginRight: 15,
  },
  label: {
    marginTop: '50%',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputs: {
    flex: 1,
    alignSelf: 'stretch',
  },
  TextInput: {
    alignSelf: 'center',
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
  buttonBox: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  button: {
    marginTop: -230,
    backgroundColor: '#519bdd',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#519bdd',
    width: '80%',
    height: 45,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  signupBox: {
    flex: 1,
    alignSelf: 'stretch',
  },
  signup: {
    marginTop: -140,
    alignSelf: 'center',
  },
  signupText: {
    textDecorationLine: 'underline',
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
    this.handleSignup = this.handleSignup.bind(this);
    this.renderError = this.renderError.bind(this);
    this.signin = this.signin.bind(this);
  }

  signin() {
    this.props.navigator.push({
      title: 'Match Me',
      leftButtonTitle: ' ',
      rightButtonTitle: 'Sign Out',
      onRightButtonPress: () => { this.props.signoutUser(); this.handleSignup(); console.log(this.props.auth); },
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
      email: this.state.email.toLowerCase(),
      password: this.state.password,
    };
    this.props.signinUser(user);
  }

  handleSignup() {
    this.props.clearError();
    this.props.goToSignup();
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
        <View style={styles.error}>
          {this.renderError()}
        </View>
        <Text style={styles.label}>Munch Buddy</Text>
        <View style={styles.inputs}>
          <TextInput style={styles.TextInput} placeholder={'Email'} onChangeText={this.updateEmail} value={this.state.email} />
          <TextInput style={styles.TextInput} placeholder={'Password'} onChangeText={this.updatePassword} value={this.state.password} />
        </View>
        <View style={styles.buttonBox}>
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}> Log In </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.signupBox}>
          <TouchableHighlight style={styles.signup} onPress={this.handleSignup}>
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
    clearError: () => dispatch(clearError()),
    goToSignup: () => dispatch(goToSignup()),
  }
);

export default (connect(mapStateToProps,
  mapDispatchToProps)(SignIn));
