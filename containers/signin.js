import React, { Component } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text, TextInput, View, TouchableHighlight, Image} from 'react-native';

import MatchPage from './matchPage';
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
    fontSize: 45,
  },
  titleContainer: {
    marginTop: '40%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  pink: {
    color: '#f4424b',
    fontWeight: 'normal',
  },
  blue: {
    color: '#519bdd',
  },
  donut: {
    height: 64,
    width: 64,
  },
  smallerDonut: {
    height: 32,
    width: 32,
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
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonBox: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
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
    marginTop: -40,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  signupBox: {
    flex: 1,
    alignSelf: 'stretch',
  },
  signup: {
    alignSelf: 'center',
  },
  signupText: {
    textDecorationLine: 'underline',
  },
  font: {
    fontFamily: "Avenir Next",
  },
  pictures: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
    marginLeft: 40,
    marginRight: 40,
    marginTop: -40,
    marginBottom: -20,
  }
});

class SignIn extends Component {

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
      component: MatchPage,
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
        <View style={styles.titleContainer}>
        <Text style={[styles.font, styles.label, styles.pink]}>Munch</Text>
        <Text style={[styles.font, styles.label, styles.blue]}>Buddy</Text>
        </View>
        <View style={styles.pictures}>
        <Image style={styles.donut}
          source={require('../imgs/sprinkleDonut.png')}
        />
        <Image style={styles.donut}
          source={require('../imgs/donut.png')}
        />
        <Image style={styles.donut}
          source={require('../imgs/pinkDonut.png')}
        />
      </View>
        <View style={styles.inputs}>
          <TextInput style={[styles.font, styles.TextInput]} placeholder={'Email'} autoCapitalize="none" onChangeText={this.updateEmail} value={this.state.email} />
          <TextInput style={[styles.font, styles.TextInput]} placeholder={'Password'} secureTextEntry onChangeText={this.updatePassword} value={this.state.password} />
        </View>
        <View style={styles.buttonBox}>
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
            <Text style={[styles.font, styles.buttonText]}> Log In </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.signupBox}>
          <TouchableHighlight style={styles.signup} onPress={this.handleSignup}>
            <Text style={[styles.font, styles.signupText]}> Need a new account? Sign up here! </Text>
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
