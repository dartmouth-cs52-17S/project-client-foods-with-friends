import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';

import Profile from './profile';
import SignIn from './signin';
import { signupUser } from '../actions';

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
  signinText: {
    textDecorationLine: 'underline',
  },
});

class SignUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
    };
    this.updateEmail = this.updateEmail.bind(this);
    this.updateFullname = this.updateFullname.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSignin = this.handleSignin.bind(this);
  }

  updateEmail(text) {
    console.log(this.state.email);
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

  handleSubmit(event) {
    console.log('handle submit');
    event.preventDefault();
    const user = {
      fullname: this.state.fullname,
      email: this.state.email,
      password: this.state.password,
    };
    this.props.signupUser(user, this.props.history);

    this.props.navigator.push({
      title: 'Profile',
      component: Profile,
      passProps: { },
    });
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

  handleSignin(event) {
    this.props.navigator.push({
      title: 'Sign In',
      component: SignIn,
      passProps: { },
    });
  }


  render(props) {
    return (
      <View style={styles.container}>
        <Text style={styles.timeLabel}>Sign Up!</Text>
        <TextInput style={styles.TextInput} placeholder={'Full Name'} onChangeText={this.updateFullname} value={this.state.fullname} />
        <TextInput style={styles.TextInput} placeholder={'Email'} onChangeText={this.updateEmail} value={this.state.email} />
        <TextInput id={'password'} style={styles.TextInput} type={'Password'} placeholder={'password'} onChangeText={this.updatePassword} value={this.state.password} />
        <View style={styles.buttonBox}>
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
            <Text> Submit! </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this.handleCancel}>
            <Text> cancel </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.signinBox}>
          <TouchableHighlight style={styles.signin} onPress={this.handleSignin}>
            <Text style={styles.signinText}> Already have an account? Sign in here </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
export default (connect(null,
  { signupUser })(SignUp));
