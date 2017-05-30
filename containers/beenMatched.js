import React, { Component } from 'react';
import { View, NavigatorIOS, Image, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Match from './matchPage';
import { clearMatchResult, removeRequest } from '../actions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  username: {
    marginTop: 15,
    fontSize: 40,
    color: '#519bdd',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next',
  },
  text: {
    textAlign: 'center',
    marginTop: 7,
    fontSize: 20,
    fontFamily: 'Avenir Next',
  },
  image: {
    width: 150,
    height: 150,
    borderColor: '#3694e9',
    borderWidth: 4,
    borderRadius: 75,
  },
  label: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 30,
    color: '#253e47',
  },
  title: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: '20%',
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 35,
    color: '#f4424b',
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
  button: {
    marginTop: 15,
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
    };

    this.beenMatchedButton = this.beenMatchedButton.bind(this);
  }

  componentWillUnmount() {
    console.log('yay it works!');
    this.props.clearMatchResult();
    this.props.removeMatchResult();
  }

  beenMatchedButton() {
    console.log('beenMatchedButton Pressed!');
    this.props.clearMatchResult();
    this.props.removeMatchResult();
    this.props.navigator.pop();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{'You\'ve been Matched!'} </Text>
        <Image
          style={styles.image}
          source={require('../imgs/user-1.png')}
        />
        <Text style={styles.label}>Your MunchBuddy wants to talk about: </Text>
        <Text style={styles.explanation}>You can chat with your new MunchBuddy by tapping the MatchHistory page. </Text>
        <TouchableOpacity style={styles.button} onPress={() => { this.beenMatchedButton(); }}>
          <Text style={styles.buttonText}>Ok!</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    clearMatchResult: () => dispatch(clearMatchResult()),
    removeMatchResult: () => dispatch(removeRequest()),
  }
);

export default (connect(null, mapDispatchToProps)(BeenMatched));
