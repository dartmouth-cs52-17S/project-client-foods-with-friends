import React from 'react';
import { connect } from 'react-redux';
import MunchBuddyTabs from '../components/tab';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native';

import Match from './match';
import { goToSignin } from '../actions';

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
    marginTop: -240,
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
    this.renderPage = this.renderPage.bind(this);
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
    this.props.goToSignin();
  }

  renderPage() {
    if (this.props.page) {
      return (
        <View style={styles.container}>
          <Text style={styles.label}>Add Stuff About Yourself!</Text>
          <View style={styles.inputs}>
            <TextInput style={styles.TextInput} placeholder={'Info1'} onChangeText={this.updateEmail} value={this.state.email} />
            <TextInput style={styles.TextInput} placeholder={'Info2'} onChangeText={this.updatePassword} value={this.state.password} />
          </View>
          <View style={styles.buttonBox}>
            <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
              <Text style={styles.buttonText}> Ok! </Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <MunchBuddyTabs />
        </View>
      );
    }
  }

  render(props) {
    return (
      <View style={styles.container}>
        {this.renderPage()}
      </View>
    );
  }
}

const mapStateToProps = state => (
  {
    error: state.auth.message,
    auth: state.auth.authenticated,
    page: state.auth.page,
  }
);

const mapDispatchToProps = dispatch => (
  {
    goToSignin: () => dispatch(goToSignin()),
  }
);

export default (connect(mapStateToProps,
  mapDispatchToProps)(SignIn));
