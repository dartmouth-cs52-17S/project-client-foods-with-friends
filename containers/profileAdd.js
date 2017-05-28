import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import MunchBuddyTabs from '../navigation/tab';
import { goToSignin, editInterests } from '../actions';

const styles = StyleSheet.create({
  label: {
    marginTop: '30%',
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 8,
    color: '#253e47',
  },
  explanation: {
    marginTop: 0,
    marginLeft: '10%',
    marginRight: '10%',
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 22,
    color: '#253e47',
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
    marginTop: -108,
    backgroundColor: '#299aff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#299aff',
    width: '80%',
    height: 45,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
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
    backgroundColor: '#06c010',
    borderWidth: 2,
    borderRadius: 6,
    borderColor: '#06c010',
    height: 35,
    minWidth: 20,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 0.3,
    shadowOpacity: 0.4,
  },
  unchecked: {
    backgroundColor: '#9299a3',
    borderWidth: 2,
    borderRadius: 6,
    borderColor: '#9299a3',
    height: 35,
    minWidth: 20,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 0.3,
    shadowOpacity: 0.4,
  },
  interestText: {
    color: '#ffffff',
  },
});

const interests = ['animals', 'sports', 'cooking', 'arts', 'travelling',
  'volunteering', 'education', 'finance', 'reading', 'nightlife', 'fitness', 'tech',
  'politics', 'music', 'dancing', 'Tim Tregubov', 'beauty', 'fashion', 'global issues', 'gaming'];

class ProfileAdd extends Component {

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
      if (this.state.interests.includes(interest)) {
        return (
          <TouchableOpacity style={styles.checked} key={interest} onPress={() => { this.handleInterest(interest); }}>
            <Text style={styles.interestText}>{interest}</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity style={styles.unchecked} key={interest} onPress={() => { this.handleInterest(interest); }}>
            <Text style={styles.interestText}>{interest}</Text>
          </TouchableOpacity>
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
          <Text style={styles.label}>Add some interests!</Text>
          <Text style={styles.explanation}>Your interests will appear on your profile for other MunchBuddies to see</Text>
          {this.renderInterests()}
          <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={styles.buttonText}> Ok! </Text>
            </TouchableOpacity>
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
    addInterests: interestList => dispatch(editInterests(interestList)),
  }
);

export default (connect(mapStateToProps,
  mapDispatchToProps)(ProfileAdd));
