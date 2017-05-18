import React, { Component } from 'react';
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Text,
  FlatList,
} from 'react-native';

import Match from './match'
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imageView: {
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  username: {
    marginTop: 15,
    fontSize: 40,
    color: '#519bdd',
    fontWeight: 'bold',
  },
  title: {
    marginTop: 15,
    fontSize: 30,
  },
  text: {
    textAlign: 'center',
    marginTop: 7,
    fontSize: 20,
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onPressButton = this.onPressButton.bind(this);
  }

  onPressButton() {
    this.props.navigator.push({
      title: 'PROFILE',
      component: Match,
      passProps: { },
    });
  }
  render()  {
    return (
      <View style={styles.imageView}>
        <Image
          style={styles.image}
          source={{ uri: 'https://image.freepik.com/free-icon/business-person-silhouette-wearing-tie_318-49988.jpg' }}
        />
        <Text style={styles.username}>Users Name</Text>
        <Text style={styles.title}>Conversation Topics:</Text>
        <TouchableHighlight onPress={this.onPressButton}>
          <Text>TOUCH ME</Text>
        </TouchableHighlight>
        <FlatList
          data={[{ title: 'Farming' }, { title: 'Dogs' }]}
          renderItem={({ item }) => <Text style={styles.text}>{item.title}</Text>}
        />
        <Text style={styles.title}>Meal History:</Text>
        <FlatList
          data={[{ title: 'June 21, 4:00pm' }, { title: 'June 22, 5:30pm' }]}
          renderItem={({ item }) => <Text style={styles.text}>{item.title}</Text>}
        />
      </View>
    );
  }
};

module.exports = Profile;
