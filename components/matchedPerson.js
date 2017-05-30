import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { View, StyleSheet, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    padding: 10,
  },
  thumbnail: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
  },
});

class MemberTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = { fullname: null, time: moment() };

    this.renderUser = this.renderUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  // use axios call to access member location from the latitude and longitude given in the json file
  componentDidMount() {
    axios.get(`https://munchbuddy.herokuapp.com/api/user/${this.props.userid}`).then((response) => {
      console.log(response.data);
      this.setState({ fullname: response.data.fullname });
      const temp = moment(this.props.time);
      this.setState({ time: temp });
    })
    .catch((error) => {
      this.setState({ fullname: null });
    });
  }

  // render the address once axios has received it
  renderUser() {
    if (this.state.fullname != null) {
      return (
        <View style={styles.view}>
          <View style={styles.container}>
            <View style={styles.rightContainer}>
              <Text style={styles.title}>{this.state.fullname}</Text>
              <Text style={styles.title}>{`Matched on ${this.state.time.format('MM/DD/YY, hh:mm A').toString()}`}</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      );
    } else {
      return <View><Text>Loading</Text></View>;
    }
  }

// template for all of the DALI members
  render() {
    return (
      <View style={styles.view}>
        {this.renderUser()}
      </View>
    );
  }
}

export default MemberTemplate;
