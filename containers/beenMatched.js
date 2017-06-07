/*
Alerts the user that they've been matched.
Shows the profile of the person they've been matched with
*/

import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { clearMatchResult, removeRequest, pullOtherProfile, getMatchHistory } from '../actions';


const styles = StyleSheet.create({
  page: {
    marginBottom: 80,
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderColor: '#ffffff',
    borderWidth: 4,
    borderRadius: 75,
    marginTop: -10,
    marginBottom: -10,
  },
  label: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    textAlign: 'center',
    fontSize: 23,
    color: '#253e47',
  },
  title: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: '20%',
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 35,
    color: '#ffffff',
  },
  header: {
    backgroundColor: '#53c5bb',
    width: '100%',
    borderColor: '#53c5bb',
    alignItems: 'center',
    paddingBottom: 20,
  },
  explanation: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
    fontSize: 17,
    color: '#253e47',
  },
  name: {
    fontSize: 25,
    marginTop: 20,
    color: '#ffffff',
  },
  convotopic: {
    marginTop: 10,
    fontSize: 33,
    alignSelf: 'center',
    color: '#3694e9',
  },
  button: {
    marginTop: 33,
    backgroundColor: '#3694e9',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3694e9',
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
});

class BeenMatched extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otherUser: '',
    };

    this.beenMatchedButton = this.beenMatchedButton.bind(this);
  }

  componentWillMount() {
    this.props.pullOtherProfile(this.props.match.User);
  }

  componentWillUnmount() {
    this.props.clearMatchResult();
    this.props.removeMatchResult();
  }

  // ok button that takes user back to matchPage
  beenMatchedButton() {
    this.props.clearMatchResult();
    this.props.removeMatchResult();
    this.props.getMatchHistory();
    this.props.navigator.pop();
  }


  render() {
    if (this.props.otherUser !== null && this.props.receiveMatch !== null) {
      return (
        <ScrollView style={styles.page}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>{'You\'ve been Matched!'} </Text>
              <Image
                style={styles.image}
                source={this.props.otherUser.profile_image}
              />
              <Text style={styles.name}>{this.props.otherUser.fullname}</Text>
            </View>
            <Text style={styles.label}>{`${this.props.otherUser.fullname} wants to talk about:`}</Text>
            <Text style={styles.convotopic}>{this.props.receiveMatch.topic}</Text>
            <Text style={styles.explanation}>{`You can chat with ${this.props.otherUser.fullname} by tapping OK and then going to Match History Page.`}</Text>
            <TouchableOpacity style={styles.button} onPress={() => { this.beenMatchedButton(); }}>
              <Text style={styles.buttonText}>Ok!</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View><Text>Loading...</Text></View>
      );
    }
  }
}

const mapDispatchToProps = dispatch => (
  {
    clearMatchResult: () => dispatch(clearMatchResult()),
    removeMatchResult: () => dispatch(removeRequest()),
    pullOtherProfile: id => dispatch(pullOtherProfile(id)),
    getMatchHistory: () => dispatch(getMatchHistory()),
  }
);


const mapStateToProps = state => (
  {
    receiveMatch: state.match.receivedMatch,
    history: state.match.receivedHistory,
    otherUser: state.auth.otherUser,
  }
);

export default (connect(mapStateToProps, mapDispatchToProps)(BeenMatched));
