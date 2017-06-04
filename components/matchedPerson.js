/*
This is a component for each person in the list of people the user has matched width.
It is called in matchHistoryPage.js
*/

import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { View, StyleSheet, Text, Image } from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
  },
  rightContainer: {
    flex: 1,
  },
  leftContainer: {
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  info: {
    fontSize: 12,
    marginBottom: 3,
  },
  sideIcon: {
    width: 22,
    height: 22,
  },
  leftIcon: {
    width: 40,
    height: 40,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
  },
});

class MemberTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: null, time: moment(), image: '',
    };

    this.renderUser = this.renderUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios.get(`https://munchbuddy.herokuapp.com/api/user/${this.props.userid}`).then((response) => {
      this.setState({ fullname: response.data.fullname, image: response.data.profile_image });
      const temp = moment(this.props.time);
      this.setState({ time: temp });
    })
    .catch((error) => {
      this.setState({ fullname: null });
    });
  }

  renderUser() {
    if (this.state.fullname != null) {
      return (
        <View style={styles.view}>
          <View style={styles.container}>
            <View style={styles.leftContainer}>
              <Image
                style={styles.leftIcon}
                source={this.state.image}
              />
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{this.state.fullname}</Text>
              <Text style={styles.info}>{`Matched on ${this.state.time.format('MM/DD/YY, hh:mm A').toString()}`}</Text>
            </View>
            <View style={styles.rightIcon}>
              <Image
                style={styles.sideIcon}
                source={require('../imgs/right-arrow.png')}
              />
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      );
    } else {
      return <View><Text>Loading...</Text></View>;
    }
  }

  render() {
    return (
      <View style={styles.view}>
        {this.renderUser()}
      </View>
    );
  }
}

export default MemberTemplate;
