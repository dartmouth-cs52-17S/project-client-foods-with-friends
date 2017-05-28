import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, AlertIOS, Text, TextInput, View, TouchableHighlight } from 'react-native';

import { signupUser, clearError, goToSignin } from '../actions';

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
  font: {
    fontFamily: 'Avenir Next',
  },
  label: {
    marginTop: '50%',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'Avenir Next',
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
  },
  button: {
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
  signinBox: {
    flex: 1,
    alignSelf: 'stretch',
  },
  signin: {
    alignSelf: 'center',
  },
  signinText: {
    textDecorationLine: 'underline',
  },
});

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
      retypePassword: ''
    };
    this.updateEmail = this.updateEmail.bind(this);
    this.updateFullname = this.updateFullname.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.updateRetypePassword = this.updateRetypePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
    this.renderError = this.renderError.bind(this);
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

  updateFullname(text) {
    this.setState({
      fullname: text,
    });
  }

  updateRetypePassword(text) {
    this.setState({
      retypePassword: text,
    });
  }

  validateFields(){
    const regexpNum = /\d+/;
    const regExpChar = /@/;
    if (this.state.password !== this.state.retypePassword) {
      AlertIOS.alert("Passwords don\'t match! Try again. ");
      return false;
    }
    // checks for any occurance of a number in user's name
    if (this.state.fullname.match(regexpNum)) {
      AlertIOS.alert("Your full name cannot contain numbers! Try again. ");
      return false;
    }
    // checks if user's email address has a @ symbol
     if (this.state.email.match(regExpChar) === null) {
       AlertIOS.alert("You must input a valid email address. Try again!");
       return false;
     }
    return true;
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.validateFields()) {
      const user = {
        fullname: this.state.fullname,
        email: this.state.email.toLowerCase(),
        password: this.state.password,
      };
      this.props.signupUser(user);
    }
    }


  handleCancel(event) {
    event.preventDefault();
    this.setState({
      email: '',
      password: '',
      fullname: '',
      retypePassword: '',
    });
  }

  handleSignin(event) {
    this.props.clearError();
    this.props.goToSignin();
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
        <Text style={[styles.font, styles.label]}>Munch Buddy</Text>
        <View style={styles.inputs}>
          <TextInput style={[styles.font, styles.TextInput]} placeholder={'Full Name'} onChangeText={this.updateFullname} value={this.state.fullname} />
          <TextInput style={[styles.font, styles.TextInput]} placeholder={'Email'} autoCapitalize="none" onChangeText={this.updateEmail} value={this.state.email} />
          <TextInput style={[styles.font, styles.TextInput]} placeholder={'Password'} secureTextEntry onChangeText={this.updatePassword} value={this.state.password} />
            <TextInput style={[styles.font, styles.TextInput]} placeholder={'Retype Password'} secureTextEntry onChangeText={this.updateRetypePassword} value={this.state.retypePassword} />
        </View>
        <View style={styles.buttonBox}>
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
            <Text style={[styles.font, styles.buttonText]}> Sign Up </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.signinBox}>
          <TouchableHighlight style={styles.signin} onPress={this.handleSignin}>
            <Text style={[styles.signinText, styles.font]}> Already have an account? Sign in here </Text>
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
    signupUser: ({ fullname, email, password }) => dispatch(signupUser({ fullname, email, password })),
    clearError: () => dispatch(clearError()),
    goToSignin: () => dispatch(goToSignin()),
  }
);

export default (connect(mapStateToProps,
  mapDispatchToProps)(SignUp));
