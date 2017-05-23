import React, { Component } from 'react';

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

class MatchPage extends React.Component {
  // static defaultProps = {
  //   date1: new Date(),
  //   date2: new Date(),
  // };
  constructor(props) {
    super(props);
    this.state = {
      date1: new Date().toString(),
      date2: new Date().toString(),
      isDateTimePicker1Visible: false,
      isDateTimePicker2Visible: false,
    };
  }

  _showDateTimePicker1 = () => this.setState({ isDateTimePicker1Visible: true });
  _showDateTimePicker2 = () => this.setState({ isDateTimePicker2Visible: true });

  _hideDateTimePicker1 = () => this.setState({ isDateTimePicker1Visible: false });
  _hideDateTimePicker2 = () => this.setState({ isDateTimePicker2Visible: false });

  _handleDate1Picked = (date1) => {
    console.log('A date has been picked: ', date1);
    const temp = date1.toString();
    this.setState({ date1: temp });
    console.log(temp);
    console.log(this.state.date1);
    this._hideDateTimePicker1();
  };
  _handleDate2Picked = (date2) => {
    console.log('A date has been picked: ', date2);
    console.log(this.state.date2);
    this.setState({ date2 });
    this._hideDateTimePicker2();
  };

  onDate1Change = (date1) => {
    this.setState({ date1 });
  };

  onDate1Change = (date2) => {
    this.setState({ date2 });
  };

  render() {
    return (
      <ScrollView style={styles.body}>
        <View>
          <Text style={styles.timeLabel}>Pick a time:</Text>

          <TouchableOpacity onPress={this._showDateTimePicker1} style={styles.topicLabel}>
            <Text>START TIME</Text>
          </TouchableOpacity>

          <Text style={styles.topicLabel}>{this.state.date1.toString()}</Text>

          <TouchableOpacity onPress={this._showDateTimePicker2} style={styles.topicLabel}>
            <Text>END TIME</Text>
          </TouchableOpacity>

          <Text style={styles.topicLabel}>{this.state.date2.toString()}</Text>

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
            color="#841584"
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
