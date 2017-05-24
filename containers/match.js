import React, { Component } from 'react';
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
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import MatchLoading from '../components/matchLoading';

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

class MatchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date1: moment(),
      date2: moment(),
      isDateTimePicker1Visible: false,
      isDateTimePicker2Visible: false,
    };
  }

  onDate1Change = (date1) => {
    this.setState({ date1 });
  };

  onDate1Change = (date2) => {
    this.setState({ date2 });
  };

  matchButton = () => {
    this.validateDates();
    this.props.navigator.push({
      title: 'Match Me!',
      leftButtonTitle: ' ',
      component: MatchLoading,
    });
  };

  validateDates = () => {
    if (this.state.date2.isBefore(this.state.date1)) {
      AlertIOS.alert('That\'s not a valid meal time!');
    }
  };

  _showDateTimePicker1 = () => this.setState({ isDateTimePicker1Visible: true });
  _showDateTimePicker2 = () => this.setState({ isDateTimePicker2Visible: true });

  _hideDateTimePicker1 = () => this.setState({ isDateTimePicker1Visible: false });
  _hideDateTimePicker2 = () => this.setState({ isDateTimePicker2Visible: false });

  _handleDate1Picked = (date1) => {
    console.log('A date has been picked: ', date1);
    const temp = moment(date1);
    this.setState({ date1: temp });
    console.log(temp);
    console.log(this.state.date1);
    this._hideDateTimePicker1();
  };

  _handleDate2Picked = (date2) => {
    console.log('A date has been picked: ', date2);
    console.log(this.state.date2);
    const temp = moment(date2);
    this.setState({ date2: temp });
    this._hideDateTimePicker2();
  };


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

export default class Match extends Component {
  static navigationOptions = {
    tabBarLabel: 'Match',

  };
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MatchPage,
          title: 'Get Matched',
        }}
        style={{ flex: 1 }}
      />
    );
  }
}
