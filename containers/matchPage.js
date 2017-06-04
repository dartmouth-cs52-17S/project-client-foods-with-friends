/*
Page that allows the user to send a match request.
User inputs a conversation topic and start-time time range
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import SocketIOClient from 'socket.io-client';
import { StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity,
        Image, AsyncStorage, AlertIOS } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MatchLoading from './matchLoading';
import { postMatch, removeRequest, clearMatchResult } from '../actions';

const styles = StyleSheet.create({
  title: {
    marginTop: 25,
    fontSize: 35,
    textAlign: 'center',
    color: '#253e47',
  },
  instructions: {
    marginTop: 20,
    fontSize: 20,
    marginLeft: '10%',
    marginRight: '10%',
    textAlign: 'center',
    color: '#253e47',
  },
  dateLabel: {
    fontSize: 20,
    textAlign: 'center',
    color: 'rgb(255, 255, 255)',
  },
  times: {
    marginTop: 10,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  to: {
    marginTop: 15,
    fontSize: 20,
    textAlign: 'center',
    color: '#253e47',
  },
  topic: {
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#0f0f0f',
    color: '#253a41',
    flex: 1,
    marginLeft: '13%',
    marginRight: '13%',
    height: 50,
    paddingLeft: 10,
    marginBottom: 10,
    marginTop: 15,
    fontSize: 25,
  },
  timeButton: {
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15,
    alignSelf: 'center',
    backgroundColor: '#53c5bb',
    width: 120,
    height: 50,
    borderWidth: 2,
    borderColor: '#53c5bb',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 1,
  },
  matchButton: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: '#3694e9',
    width: 120,
    height: 50,
    borderWidth: 2,
    borderColor: '#3694e9',
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 1,
  },
  image: {
    marginTop: 30,
    marginBottom: 10,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  sideIcon: {
    width: 40,
    height: 40,
    marginLeft: 20,
    marginRight: 20,
  },
});

class MatchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date1: moment(),
      date2: moment(),
      isDateTimePicker1Visible: false,
      isDateTimePicker2Visible: false,
      topic: '',
      position: '',
    };

    this.onDate1Change = this.onDate1Change.bind(this);
    this.onDate2Change = this.onDate1Change.bind(this);
    this.onTopicChange = this.onTopicChange.bind(this);
    this.matchButton = this.matchButton.bind(this);
    this.sendEndpoint = this.sendEndpoint.bind(this);
    this.validateInputs = this.validateInputs.bind(this);
    this._showDateTimePicker1 = this._showDateTimePicker1.bind(this);
    this._showDateTimePicker2 = this._showDateTimePicker2.bind(this);
    this._hideDateTimePicker1 = this._hideDateTimePicker1.bind(this);
    this._hideDateTimePicker2 = this._hideDateTimePicker2.bind(this);
    this._handleDate1Picked = this._handleDate1Picked.bind(this);
    this._handleDate2Picked = this._handleDate2Picked.bind(this);
    this.socket = SocketIOClient('https://munchbuddy.herokuapp.com');
  }

  componentDidMount() {
    AsyncStorage.getItem('token').then((response) => {
      if (response !== null) {
        const User = response;
        this.socket.on('connect', () => {
          this.socket
              .emit('hello', 'HELLO FROM CLIENT')
              .emit('authenticate', { token: User }) // send the jwt token
              .on('authenticated', () => {
                console.log('Authorized');
                this.socket.on('foundMatchResult', this.onMatchResultFound);
              })
              .on('unauthorized', (msg) => {
                console.log(`Unauthorized: ${JSON.stringify(msg.data)}`);
                throw new Error(msg.data.type);
              });
        });
      }
    }).catch((err) => {
      console.log(err);
    });
    this.props.clearMatchResult();
    this.props.removeMatchResult();
  }

  onDate1Change(date1) {
    this.setState({ date1 });
  }

  onDate2Change(date2) {
    this.setState({ date2 });
  }

  onTopicChange(topic) {
    this.setState({ topic });
  }

  // get location of user
  getPosition() {
    return new Promise((fulfill, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const initialPosition = JSON.stringify(position);
          this.setState({ initialPosition }, () => {
            fulfill();
          });
        });
    });
  }

  // send match request and go to match loading page
  matchButton() {
    if (this.validateInputs()) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.sendEndpoint([position.coords.latitude, position.coords.longitude]);
        });
      this.props.navigator.push({
        title: 'Match Me!',
        leftButtonTitle: ' ',
        component: MatchLoading,
      });
    }
  }

  // sends match request
  sendEndpoint(location) {
    const matchInfo = {
      start_time: this.state.date1.toISOString(),
      end_time: this.state.date2.toISOString(),
      topic: this.state.topic,
      loc: location,
    };
    this.props.postMatch(matchInfo);
  }

  // check that time range is valid
  validateInputs() {
    if (this.state.date2.isBefore(this.state.date1)) {
      AlertIOS.alert('That\'s not a valid meal time!');
      return false;
    } else {
      if (this.state.topic === '') {
        AlertIOS.alert('Please enter a conversation topic!');
        return false;
      }
      return true;
    }
  }

  // for date picker modals
  _showDateTimePicker1() { this.setState({ isDateTimePicker1Visible: true }); }
  _showDateTimePicker2() { this.setState({ isDateTimePicker2Visible: true }); }

  _hideDateTimePicker1() { this.setState({ isDateTimePicker1Visible: false }); }
  _hideDateTimePicker2() { this.setState({ isDateTimePicker2Visible: false }); }

  // set the times in state
  _handleDate1Picked(date1) {
    const temp = moment(date1);
    this.setState({ date1: temp });
    this._hideDateTimePicker1();
  }

  _handleDate2Picked(date2) {
    const temp = moment(date2);
    this.setState({ date2: temp });
    this._hideDateTimePicker2();
  }


  render() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.title}>Grab a munch!</Text>
          <Text style={styles.instructions}>Choose a conversation topic:</Text>
          <TextInput
            placeholder="Enter topic"
            style={styles.topic}
            onChangeText={this.onTopicChange}
          />
          <Text style={styles.instructions}>Choose a time range in which you wish to begin your meal:</Text>

          <View style={styles.times}>
            <TouchableOpacity style={styles.timeButton} onPress={this._showDateTimePicker1}>
              <Text style={styles.dateLabel}>{this.state.date1.format('hh:mm A').toString()}</Text>
            </TouchableOpacity>
            <Text style={styles.to}>to</Text>
            <TouchableOpacity style={styles.timeButton} onPress={this._showDateTimePicker2}>
              <Text style={styles.dateLabel}>{this.state.date2.format('hh:mm A').toString()}</Text>
            </TouchableOpacity>
          </View>

          <DateTimePicker
            isVisible={this.state.isDateTimePicker1Visible}
            onConfirm={this._handleDate1Picked}
            onCancel={this._hideDateTimePicker1}
            mode={'time'}
            titleIOS={'Pick a start time'}
          />

          <DateTimePicker
            isVisible={this.state.isDateTimePicker2Visible}
            onConfirm={this._handleDate2Picked}
            onCancel={this._hideDateTimePicker2}
            mode={'time'}
            titleIOS={'Pick an end time'}
          />
          <View style={styles.image}>
            <Image
              style={styles.sideIcon}
              source={require('../imgs/muffin.png')}
            />
            <Image
              source={require('../imgs/cupcake.png')}
            />
            <Image
              style={styles.sideIcon}
              source={require('../imgs/muffin2.png')}
            />
          </View>
          <TouchableOpacity style={styles.matchButton} onPress={this.matchButton}>
            <Text style={styles.dateLabel}>Match Me!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => (
  {
    clearMatchResult: () => dispatch(clearMatchResult()),
    removeMatchResult: () => dispatch(removeRequest()),
    postMatch: matchinfo => dispatch(postMatch(matchinfo)),
  }
);

export default connect(null, mapDispatchToProps)(MatchPage);
