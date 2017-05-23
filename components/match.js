import React from 'react';

import {
  DatePickerIOS,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
  timeLabel: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 30,
  },
  topicLabel: {
    textAlign: 'center',
    marginTop: 25,
    fontSize: 25,
  },
  topic: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 30,
    marginLeft: 50,
    marginRight: 50,
    height: 50,
    padding: 4,
    marginBottom: 4,
    marginTop: 15,
  },
});

class Match extends React.Component {
  static defaultProps = {
    date1: new Date(),
    date2: new Date(),
  };

  state = {
    date1: new Date(),
    date2: new Date(),
    isDateTimePicker1Visible: false,
    isDateTimePicker2Visible: false,
  };

  _showDateTimePicker1 = () => this.setState({ isDateTimePicker1Visible: true });
  _showDateTimePicker2 = () => this.setState({ isDateTimePicker2Visible: true });

  _hideDateTimePicker1 = () => this.setState({ isDateTimePicker1Visible: false });
  _hideDateTimePicker2 = () => this.setState({ isDateTimePicker2Visible: false });

  _handleDate1Picked = (date1) => {
    console.log('A date has been picked: ', date1);
    this.setState(date1: date1);
    this._hideDateTimePicker1();
  };
  _handleDate2Picked = (date2) => {
    this.setState(date2: date2);
    console.log('A date has been picked: ', date2);
    this._hideDateTimePicker2();
  };

  onDate1Change = (date1) => {
    this.setState({ date1 });
  };

  onDate1Change = (date2) => {
    this.setState({ date2 });
  };

  onTimezoneChange = (event) => {
    const offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({ timeZoneOffsetInHours: offset });
  };

  render() {
    return (
      <ScrollView style={styles.body}>
        <View>
          <Text style={styles.timeLabel}>Pick a time:</Text>
          <TouchableOpacity onPress={this._showDateTimePicker1}>
            <Text>START TIME</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._showDateTimePicker2}>
            <Text>END TIME</Text>
          </TouchableOpacity>
          <Text>{this.state.date1}</Text>
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
        </View>
      </ScrollView>
    );
  }
}

module.exports = Match;
