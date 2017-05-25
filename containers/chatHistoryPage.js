import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, NavigatorIOS, ListItem, List, FlatList } from 'react-native';

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
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });
    fetch(url)
        .then(res => res.json())
        .then((res) => {
          this.setState({
            data: page === 1 ? res.results : [...this.state.data, ...res.results],
            error: res.error || null,
            loading: false,
            refreshing: false,
          });
        })
        .catch((error) => {
          this.setState({ error, loading: false });
        });
  };

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
