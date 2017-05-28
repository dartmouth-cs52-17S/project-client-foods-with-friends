import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  NavigatorIOS,
  AlertIOS,
} from 'react-native';

import DateTimePicker from 'react-native-modal-datetime-picker';

import MatchLoading from '../components/matchLoading';
import { postMatch } from '../actions';

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    fontSize: 30,
    textAlign: 'center',
  },
  dateLabel: {
    marginTop: 25,
    fontSize: 20,
    textAlign: 'center',
  },
  topicLabel: {
    marginTop: 25,
    fontSize: 15,
    textAlign: 'center',
  },
  topic: {
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#0f0f0f',
    flex: 1,
    marginLeft: 50,
    marginRight: 50,
    height: 50,
    padding: 4,
    marginBottom: 4,
    marginTop: 15,
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

  getPosition() {
    return new Promise((fulfill, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const initialPosition = JSON.stringify(position);
          this.setState({ initialPosition }, () => {
            fulfill();
            console.log('our current position:');
            console.log(position);
          });
        });
    });
  }

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

  sendEndpoint(location) {
    const matchInfo = {
      start_time: this.state.date1.toISOString(),
      end_time: this.state.date2.toISOString(),
      topic: this.state.topic,
      loc: location,
    };
    this.props.postMatch(matchInfo);
  }

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

  _showDateTimePicker1() { this.setState({ isDateTimePicker1Visible: true }); }
  _showDateTimePicker2() { this.setState({ isDateTimePicker2Visible: true }); }

  _hideDateTimePicker1() { this.setState({ isDateTimePicker1Visible: false }); }
  _hideDateTimePicker2() { this.setState({ isDateTimePicker2Visible: false }); }

  _handleDate1Picked(date1) {
    console.log('A date has been picked: ', date1);
    const temp = moment(date1);
    this.setState({ date1: temp });
    console.log(temp);
    console.log(this.state.date1);
    this._hideDateTimePicker1();
  }

  _handleDate2Picked(date2) {
    console.log('A date has been picked: ', date2);
    console.log(this.state.date2);
    const temp = moment(date2);
    this.setState({ date2: temp });
    this._hideDateTimePicker2();
  }


  render() {
    return (
      <ScrollView>
        <View>
          <Text style={styles.title}>Pick a time:</Text>

          <TouchableOpacity onPress={this._showDateTimePicker1}>
            <Text style={styles.topicLabel}>START TIME</Text>
          </TouchableOpacity>

          <Text style={styles.dateLabel}>{this.state.date1.format('hh:mm A').toString()}</Text>

          <TouchableOpacity onPress={this._showDateTimePicker2}>
            <Text style={styles.topicLabel}>END TIME</Text>
          </TouchableOpacity>

          <Text style={styles.dateLabel}>{this.state.date2.format('hh:mm A').toString()}</Text>

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

          <Text style={styles.topicLabel}>Pick a conversation topic:</Text>
          <TextInput
            placeholder="Enter topic"
            style={styles.topic}
            onChange={this.onTopicChange}
          />
          <Button
            title="Match Me!"
            onPress={this.matchButton}
          />
        </View>
      </ScrollView>
    );
  }
}


export default connect(null, { postMatch })(MatchPage);
