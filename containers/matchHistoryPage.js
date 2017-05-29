import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Text, Image, FlatList, ScrollView, TouchableHighlight, NavigatorIOS, ListView } from 'react-native';
import MatchProfile from '../components/matchProfile';
import { getMatchHistory } from '../actions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    const history = nextProps.history;
    if (history) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(history),
      });
    }
  }

  showProfileDetail(item) {
    this.props.navigator.push({
      translucent: 'false',
      title: '',
      component: MatchProfile,
      passProps: { item },
    });
  }

  renderCell(person) {
    console.log(this.props.history);
    console.log(person.User);
    return (
      <TouchableHighlight onPress={() => { this.showProfileDetail(person); }} underlayColor="#dddddd">
        <View>
          <View style={styles.container}>
            <View style={styles.rightContainer}>
              <Text style={styles.title}>Hey</Text>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    if (this.props.history === null) {
      return (
        <View><Text>Hi</Text></View>
      );
    } else {
      return (
        <View style={{ marginBottom: 60 }}>
          <ListView
            removeClippedSubviews={false}
            dataSource={this.state.dataSource}
            renderRow={(person) => { this.renderCell(person); }}
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

// const mapDispatchToProps = dispatch => (
//   {
//     getMatchHistory: () => dispatch(getMatchHistory()),
//   }
// );

export default (connect(mapStateToProps,
  { getMatchHistory })(MatchHistoryPage));
