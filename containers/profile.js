import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Text,
  FlatList,
  ScrollView,
  NavigatorIOS,
} from 'react-native';

import { signoutUser } from '../actions';

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 250,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 125,
  },
  imageView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  username: {
    marginTop: 5,
    fontSize: 30,
    color: '#519bdd',
    fontWeight: 'bold',
    fontFamily: 'Avenir Next',
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontFamily: 'Avenir Next',
  },
  text: {
    textAlign: 'center',
    marginTop: 7,
    fontSize: 14,
    fontFamily: 'Avenir Next',
  },
  button: {
    borderWidth: 1,
    borderColor: '#000000',
  },
});

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.onPressButton = this.onPressButton.bind(this);
  }

  onPressButton() {
    this.props.signoutUser();
    // this.props.navigator.push({
    //   title: 'PROFILE',
    //   component: Match,
    //   passProps: { },
    // });
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.imageView}>
          <Image
            style={styles.image}
            source={{ uri: 'https://image.freepik.com/free-icon/business-person-silhouette-wearing-tie_318-49988.jpg' }}
          />
          <Text style={styles.username}>Users Name</Text>
          <Text style={styles.title}>Interests:</Text>
          <FlatList
            data={[{ title: 'Farming' }, { title: 'Dogs' }]}
            renderItem={({ item }) => <Text style={styles.text}>{item.title}</Text>}
          />
          <Text style={styles.title}>Conversation Topics:</Text>
          <FlatList
            data={[{ title: 'The Human heart' }, { title: 'Banana Slugs' }]}
            renderItem={({ item }) => <Text style={styles.text}>{item.title}</Text>}
          />
          <Text style={styles.title}>Meal History:</Text>
          <FlatList
            data={[{ title: 'June 21, 4:00pm' }, { title: 'June 22, 5:30pm' }]}
            renderItem={({ item }) => <Text style={styles.text}>{item.title}</Text>}
          />
          <TouchableHighlight style={styles.button} onPress={this.onPressButton}>
            <Text>Sign Out</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    signoutUser: () => dispatch(signoutUser()),
  }
);

export default (connect(null, mapDispatchToProps)(ProfilePage));
