import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
} from 'react-native';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signupUser } from '../actions';
import Match from './match';

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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 23,
    fontWeight: 'bold',
  },
  timeLabel: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 30,
  },
  topicLabel: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 25,
  },
  topic: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    fontSize: 20,
    marginLeft: 50,
    marginRight: 50,
    height: 50,
    padding: 0,
    marginBottom: 4,
    marginTop: 15,
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
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: '',
      email: '',
      password: '',
    };
    this.onFullnameChange = this.onFullnameChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);

    this.onPressButton = this.onPressButton.bind(this);
  }

  onFullnameChange(event) {
    this.setState({ fullname: event.target.value });
    console.log(this.state.fullname);
  }

  onEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  onPressButton(event) {
    signupUser(this.state);
    console.log(this.state.fullname);
    this.props.navigator.push({
      title: 'PROFILE',
      component: Match,
      passProps: { },
    });
  }

  render() {
    return (
      <View>
        <TextInput placeholder="Full name" style={styles.topic} onChange={this.onFullnameChange} value={this.state.fullname} />
        <TextInput placeholder="Email" style={styles.topic} onChange={this.onEmailChange} value={this.state.email} />
        <TextInput placeholder="Password" style={styles.topic} onChange={this.onPasswordChange} value={this.state.password} />
        <TouchableHighlight onPress={this.onPressButton}>
          <Text>Sign Up</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    signup: ({ fullname, email, password }) => dispatch(signupUser({ fullname, email, password })),
  }
);

export default withRouter(connect(null, mapDispatchToProps)(SignUp));
