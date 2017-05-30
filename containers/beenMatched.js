import React, { Component } from 'react';
import { View, NavigatorIOS, Image, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import Chat from '../containers/chatHistoryPage';
import ChatHistory from '../navigation/chatHistory';
import Match from './matchPage';
import { clearMatchResult, removeRequest } from '../actions';


const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 125,
    borderWidth: 1,
    borderColor: '#000000',
  },
  imageView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  username: {
    marginTop: 15,
    fontSize: 40,
    color: '#519bdd',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next',
  },
  title: {
    marginTop: 15,
    fontSize: 30,
    fontFamily: 'Avenir Next',
  },
  text: {
    textAlign: 'center',
    marginTop: 7,
    fontSize: 20,
    fontFamily: 'Avenir Next',
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
      <View style={styles.imageView}>
        <Text style={styles.username}>Youve Been Matched! </Text>
        <Image
          style={styles.image}
          source={{ uri: 'https://image.freepik.com/free-icon/business-person-silhouette-wearing-tie_318-49988.jpg' }}
        />
        <TouchableOpacity onPress={() => { this.beenMatchedButton(); }}>
          <Text>Ok!</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Your meal buddys conversation topic was: </Text>
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
