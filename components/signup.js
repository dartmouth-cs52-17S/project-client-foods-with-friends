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
    fontFamily: "Avenir Next",
  },
  buttonBox: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontFamily: "Avenir Next",
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
    fontFamily: "Avenir Next",
  },
  title: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 30,
    fontFamily: "Avenir Next",
  },
  topicLabel: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 25,
    fontFamily: "Avenir Next",
  },
  topic: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 30,
    marginLeft: 50,
    marginRight: 50,
    height: 50,
    padding: 4,
    marginBottom: 4,
    marginTop: 15,
    fontFamily: "Avenir Next",
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelView: {
    marginRight: 10,
    paddingVertical: 2,
  },
  label: {
    fontWeight: '500',
    fontFamily: "Avenir Next",
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
    fontFamily: "Avenir Next",
  },
  avenir: {
    fontSize: 14,
    fontFamily: "Avenir Next",
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
      title: 'PROFILE',
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
    // this.props.history.go('/');
  }


  render(props) {
    return (
      <View style={styles.container}>
        <Text style={styles.timeLabel}>Sign Up!</Text>
        <TextInput style={styles.TextInput} placeholder={'Full Name'} onChangeText={this.updateFullname} value={this.state.fullname} />
        <TextInput style={styles.TextInput} placeholder={'Email'} onChangeText={this.updateEmail} value={this.state.email} />
        <TextInput id={'password'} style={styles.TextInput} type={'Password'} placeholder={'password'} onChangeText={this.updatePassword} value={this.state.password} />
        <View style={styles.buttonBox}>
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)}>
            <Text style={styles.avenir}> Submit! </Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.button} onPress={this.handleCancel}>
            <Text style={styles.avenir}> cancel </Text>
          </TouchableHighlight>
        </View>


      </View>
    );
  }
}
export default (connect(null,
  { signupUser })(SignUp));
