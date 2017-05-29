import React, { Component } from 'react';
import { View, StyleSheet, Text, NavigatorIOS, ListItem, List, FlatList } from 'react-native';

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  username: {
    marginTop: 25,
    fontSize: 30,
    textAlign: 'center',
    color: '#519bdd',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next',
  },
  text: {
    textAlign: 'center',
    marginTop: 7,
    fontSize: 14,
    fontFamily: 'Avenir Next',
  },
});

class ChatHistoryPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.body}>
        <Text style={styles.username}>Chat</Text>
        <Text style={styles.text}> Coming Soon! </Text>
      </View>
    );
  }
}

export default ChatHistoryPage;
