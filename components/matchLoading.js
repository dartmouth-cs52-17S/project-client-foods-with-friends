// loading screen that says "Finding your match..." when user presses Match me!
// maybe include a spinny loady thing

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import MatchPage from '../containers/matchPage';

import { getMatchResult, clearMatch } from '../actions';

const styles = StyleSheet.create({
  container: {
    marginTop: 75,
    alignItems: 'center',
  },
  image: {
    width: 107,
    height: 165,
    padding: 10,
  },
  description: {
    padding: 10,
    fontSize: 20,
    color: '#854af2',
  },
});

class MatchLoading extends Component {
  constructor(props) {
    super(props);

    const timer = setInterval(this.props.getMatchResult, 10000);

    this.state = { timerid: timer };
  }

  componentDidMount() {
    if (this.props.match !== null) {
      clearInterval(this.state.timerid);
      this.props.clearMatch();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>Finding your match... Check back shortly!</Text>
        <TouchableHighlight onPress={() => {
          this.props.navigator.push({
            title: 'Match',
            leftButtonTitle: ' ',
            component: MatchPage,
          });
        }}
        >
          <Text style={styles.topicLabel}>OK!</Text>
        </TouchableHighlight>
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
    clearMatch: () => dispatch(clearMatch()),
  }
);

export default (connect(mapStateToProps, mapDispatchToProps)(MatchLoading));
