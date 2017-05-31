/*
List of people the user has been matched with
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, TouchableOpacity, NavigatorIOS, ListView } from 'react-native';
import ChatPage from '../components/chatPage';
import MatchedPerson from '../components/matchedPerson';
import MatchProfile from '../containers/matchProfile';
import { getMatchHistory } from '../actions';


const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  listView: {
    backgroundColor: 'white',
  },
});

class MatchHistoryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: 'cat',
      isLoading: true,
      history: [],
      dataSource: new ListView.DataSource({
        rowHasChanged: () => true,
      }),
    };

    this.showProfileDetail = this.showProfileDetail.bind(this);
    this.renderCell = this.renderCell.bind(this);
  }

  componentDidMount() {
    this.props.getMatchHistory();
  }

  componentWillReceiveProps(nextProps) {
    const historyReverse = [...nextProps.history];
    const history = historyReverse.reverse();
    const check = [];
    const people = [];
    for (let i = 0; i < history.length; i += 1) {
      if (people.length === 0 || !check.includes(history[i].User)) {
        people.push({ User: history[i].User, match_time: history[i].match_time });
        check.push(history[i].User);
      }
    }
    this.setState({ history: people });
    if (history) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.history),
      });
    }
  }

  showProfileDetail(person) {
    this.props.navigator.push({
      showTabBar: false,
      translucent: false,
      tabBarVisible: false,
      title: 'Chat',
      component: ChatPage,
      passProps: person,
      rightButtonIcon: require('../imgs/user.png'),
      onRightButtonPress: () => {
        this.props.navigator.push({
          translucent: 'false',
          title: 'Match Profile',
          component: MatchProfile,
          tabBarVisible: false,
          passProps: person,
        });
      },
    });
  }

  renderCell(person) {
    return (
      <TouchableOpacity onPress={() => { this.showProfileDetail(person); }} underlayColor="#dddddd">
        <MatchedPerson userid={person.User} time={person.match_time} />
      </TouchableOpacity>
    );
  }

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: () => true });
    if (this.state.history === null) {
      console.log(this.state.history);
      return (
        <View><Text>Hi</Text></View>
      );
    } else {
      return (
        <View style={styles.view}>
          <ListView
            removeClippedSubviews={false}
            dataSource={ds.cloneWithRows(this.state.history)}
            renderRow={person => <View>{this.renderCell(person)}</View>}
            style={styles.listView}
          />
        </View>
      );
    }
  }
}

const mapStateToProps = state => (
  {
    history: state.match.receivedHistory,
  }
);

const mapDispatchToProps = dispatch => (
  {
    getMatchHistory: () => dispatch(getMatchHistory()),
  }
);

export default (connect(mapStateToProps,
  mapDispatchToProps)(MatchHistoryPage));
