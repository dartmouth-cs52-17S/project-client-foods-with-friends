import React from 'react';
import { connect } from 'react-redux';
import MunchBuddyTabs from '../components/tab';

import { StyleSheet, Text, TextInput, View, TouchableHighlight } from 'react-native';

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
  interests: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#219e27',
    borderWidth: 2,
    borderRadius: 6,
    borderColor: '#219e27',
    height: 35,
    minWidth: 20,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
  unchecked: {
    backgroundColor: '#a5a6a8',
    borderWidth: 2,
    borderRadius: 6,
    borderColor: '#a5a6a8',
    height: 35,
    minWidth: 20,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
  },
});

const interests = ['dogs', 'cats', 'bananas'];

class ProfileAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      interests: [],
    };
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.renderInterests = this.renderInterests.bind(this);
    this.handleInterest = this.handleInterest.bind(this);
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

  handleInterest(interest) {
    if (this.state.interests.includes(interest)) {
      const newstate = [...this.state.interests];
      const index = newstate.indexOf(interest);
      console.log(index);
      newstate.splice(index, 1);
      this.setState({ interests: newstate });
      console.log(newstate);
    } else {
      this.setState({ interests: [...this.state.interests, interest] });
    }
  }

  renderInterests() {
    const interestItems = interests.map((interest) => {
      let checked = false;
      for (let i = 0; i < this.state.interests.length; i += 1) {
        if (this.state.interests[i] === interest) {
          checked = true;
        }
      }
      if (checked) {
        return (
          <TouchableHighlight style={styles.checked} key={interest} onPress={() => { this.handleInterest(interest); }}>
            <Text>{interest}</Text>
          </TouchableHighlight>
        );
      } else {
        return (
          <TouchableHighlight style={styles.unchecked} key={interest} onPress={() => { this.handleInterest(interest); }}>
            <Text>{interest}</Text>
          </TouchableHighlight>
        );
      }
    });
    return (
      <View style={styles.interests}>
        {interestItems}
      </View>
    );
  }

  renderPage() {
    if (this.props.page) {
      return (
        <View style={styles.container}>
          <Text style={styles.label}>Add Stuff About Yourself!</Text>
          {this.renderInterests()}
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
  mapDispatchToProps)(ProfileAdd));
