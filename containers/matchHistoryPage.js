import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Image, FlatList, ScrollView, TouchableOpacity, NavigatorIOS, ListView } from 'react-native';
import ChatPage from '../components/chatPage';
import MatchedPerson from '../components/matchedPerson';
import BeenMatched from '../containers/beenMatched';
import { getMatchHistory } from '../actions';


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
  subtitle: {
    fontSize: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
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
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
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
    if (history) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(people),
      });
    }
  }

  showProfileDetail(person) {
    this.props.navigator.push({
      showTabBar: false,
      translucent: 'false',
      tabBarVisible: false,
      title: '',
      rightButtonIcon: require('../imgs/user.png'),
      onRightButtonPress: () => {
        this.props.navigator.push({
          translucent: 'false',
          title: 'hello',
          component: BeenMatched,
          tabBarVisible: false,
        });
      },
      component: ChatPage,
      passProps: person,
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
    if (this.props.history === null) {
      return (
        <View><Text>Hi</Text></View>
      );
    } else {
      return (
        <View style={styles.view}>
          <ListView
            removeClippedSubviews={false}
            dataSource={this.state.dataSource}
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
