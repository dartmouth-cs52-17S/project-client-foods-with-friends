// loading screen that says "Finding your match..." when user presses Match me!
// maybe include a spinny loady thing

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight, Image, Animated, Easing, AlertIOS } from 'react-native';
import MatchPage from '../containers/matchPage';

import { getMatchResult, clearMatchResult, removeRequest } from '../actions';
import BeenMatched from './beenMatched';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: 107,
    height: 165,
    padding: 10,
  },
  description: {
    marginTop: 10,
    padding: 10,
    fontSize: 20,
    color: '#854af2',
  },
  font: {
    fontFamily: 'Avenir Next',
  },
  button: {
    backgroundColor: '#bf4132',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#bf4132',
    width: '80%',
    height: 45,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -40,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
    shadowOpacity: 1.0,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  findingMatch: {
    marginTop: 20,
  },
  buttonBox: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },

});

class MatchLoading extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.spinValue = new Animated.Value(0);
    this.spin = this.spin.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  componentDidMount() {
    this.spin();
    this.props.getMatchResult();
  }

  componentWillUnmount() {
    console.log('yay it works as well!');
    this.props.clearMatchResult();
    this.props.removeMatchResult();
  }

  spin() {
    this.spinValue.setValue(0);
    Animated.timing(
    this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
      },
  ).start(() => this.spin());
  }

  handleCancel() {
    AlertIOS.alert(
     'Are you sure you want to cancel your match request?',
     'Requests normally expire when you reach your designated meal time.',
      [
       { text: 'Yes, cancel my request', onPress: () => { this.props.navigator.pop(); this.props.removeMatchResult(); } },
       { text: 'No, I\'ve changed my mind', onPress: () => console.log('noCancel pressed') },
      ],
    );
  }


  render() {
    console.log('state of this.props.match:');
    console.log(this.props.match);

    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    if (this.props.match !== null) {
      return <BeenMatched navigator={this.props.navigator} />;
    }
    return (
      <View style={styles.container}>
        <View>
          <Animated.Image
            style={{
              width: 128,
              height: 128,
              marginTop: '40%',
              transform: [{ rotate: spin }] }}
            source={require('../imgs/pie.png')}
          />
        </View>
        <View style={styles.findingMatch}>
          <Text style={styles.description, styles.font}>Finding your match... Check back shortly!</Text>
        </View>
        <View style={styles.buttonBox}>
          <TouchableHighlight style={styles.button} onPress={this.handleCancel}>
            <Text style={[styles.font, styles.buttonText]}> Cancel my Match</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => (
  {
    match: state.match.receivedMatch,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getMatchResult: () => dispatch(getMatchResult()),
    clearMatchResult: () => dispatch(clearMatchResult()),
    removeMatchResult: () => dispatch(removeRequest()),
  }
);

export default (connect(mapStateToProps, mapDispatchToProps)(MatchLoading));
