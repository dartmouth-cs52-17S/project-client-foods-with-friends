import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, NavigatorIOS } from 'react-native';


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

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.body}>
          <Text style={styles.username}>Chat</Text>
          <Text style={styles.text}> Coming Soon! </Text>
        </View>
      </ScrollView>
    );
  }
}

export default class ChatHistory extends Component {
  static navigationOptions = {
    tabBarLabel: 'Chat',
  };
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: ChatPage,
          title: 'Chat',
        }}
        style={{ flex: 1 }}
      />
    );
  }
}
