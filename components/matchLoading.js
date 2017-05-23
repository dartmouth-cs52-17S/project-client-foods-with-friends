// loading screen that says "Finding your match..." when user presses Match me!
// maybe include a spinny loady thing

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
      <Text style={styles.description}>Finding your match...</Text>
    </View>
  );
};

export default matchLoading;
