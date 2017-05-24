import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, ScrollView, NavigatorIOS } from 'react-native';

import MatchProfile from '../components/matchProfile';

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

class MatchHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  matchButton = () => {
    console.log('matchButtonPressed!');
    this.validateDates();
    this.props.navigator.push({
      title: '!',
      component: MatchProfile,
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.body}>
          <Text style={styles.username}>Match History</Text>
          <FlatList
            data={[{ title: 'June 21, 4:00pm' }, { title: 'June 22, 5:30pm' }]}
            renderItem={({ item }) => <Text style={styles.text}>{item.title}</Text>}
          />
        </View>
      </ScrollView>
    );
  }
}

export default class MatchHistoryNav extends Component {
  static navigationOptions = {
    tabBarLabel: 'Match',
  };
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MatchHistory,
          title: 'Match History',
        }}
        style={{ flex: 1 }}
      />
    );
  }
}
