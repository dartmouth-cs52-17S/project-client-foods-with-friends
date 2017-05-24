import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

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
});

const MatchProfile = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>Finding your match... Check back shortly!</Text>

      <TouchableHighlight onPress={this.beenMatchedButon}>
        <Text style={styles.topicLabel}>OK!</Text>
      </TouchableHighlight>
    </View>
  );
};

export default MatchProfile;
