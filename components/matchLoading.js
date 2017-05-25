// loading screen that says "Finding your match..." when user presses Match me!
// maybe include a spinny loady thing

import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import MatchPage from '../containers/matchPage';

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

const matchLoading = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>Finding your match... Check back shortly!</Text>

      <TouchableHighlight onPress={() => {
        props.navigator.push({
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
};

export default matchLoading;
