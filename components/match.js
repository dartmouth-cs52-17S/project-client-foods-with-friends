import React from 'react';

import {
  DatePickerIOS,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from 'react-native';

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
    date: new Date(),
    timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
  };

  state = {
    date: this.props.date,
    timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
  };

  onDateChange = (date) => {
    this.setState({ date });
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
          <DatePickerIOS
            date={this.state.date}
            mode="time"
            timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
            onDateChange={this.onDateChange}
            minuteInterval={15}
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
