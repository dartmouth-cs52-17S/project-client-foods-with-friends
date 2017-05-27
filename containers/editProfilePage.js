import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

import MunchBuddyTabs from '../navigation/tab';
import { goToSignin, editInterests } from '../actions';

const styles = StyleSheet.create({
  label: {
    marginTop: '10%',
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonBox: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  button: {
    marginTop: -110,
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
    flexWrap: 'wrap',
    justifyContent: 'center',
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

const interests = ['animals', 'sports', 'cooking', 'arts', 'travelling',
  'volunteering', 'education', 'finance', 'reading', 'nightlife', 'fitness', 'tech',
  'politics', 'music', 'dancing', 'Tim Tregubov', 'beauty', 'fashion', 'global issues'];

class EditProfile extends Component {

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
    this.props.addInterests(this.state.interests);
    this.props.goToSignin();
  }

  handleInterest(interest) {
    if (this.state.interests.includes(interest)) {
      const newstate = [...this.state.interests];
      const index = newstate.indexOf(interest);
      newstate.splice(index, 1);
      this.setState({ interests: newstate });
    } else {
      this.setState({ interests: [...this.state.interests, interest] });
    }
  }

  renderInterests() {
    const interestItems = interests.map((interest) => {
      if (this.state.interests.includes(interest)) {
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
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Choose some interests!</Text>
        {this.renderInterests()}
        <View style={styles.buttonBox}>
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}> Ok! </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  render(props) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Choose some interests!</Text>
        {this.renderInterests()}
        <View style={styles.buttonBox}>
          <TouchableHighlight style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}> Ok! </Text>
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
    page: state.auth.page,
  }
);

const mapDispatchToProps = dispatch => (
  {
    goToSignin: () => dispatch(goToSignin()),
    addInterests: interestList => dispatch(editInterests(interestList)),
  }
);

export default (connect(mapStateToProps,
  mapDispatchToProps)(EditProfile));
