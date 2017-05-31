/*
This page shows up after a user signs up for the first time.
It allows them to input their interests and choose a profile image.
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, Image, ListView, ScrollView, AlertIOS } from 'react-native';
import MunchBuddyTabs from '../navigation/tab';
import { goToSignin, editInterests } from '../actions';

const styles = StyleSheet.create({
  label: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 5,
    textAlign: 'center',
    fontSize: 23,
    color: '#253e47',
  },
  explanation: {
    marginTop: 0,
    marginLeft: '10%',
    marginRight: '10%',
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 17,
    color: '#253e47',
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonBox: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#3694e9',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#3694e9',
    width: '80%',
    height: 45,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    shadowOpacity: 0.8,
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
  },
  interests: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  checked: {
    backgroundColor: '#53c5bb',
    borderWidth: 2,
    borderRadius: 6,
    borderColor: '#53c5bb',
    height: 35,
    minWidth: 20,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 0.3,
    shadowOpacity: 0.4,
  },
  unchecked: {
    backgroundColor: '#a8b3bb',
    borderWidth: 2,
    borderRadius: 6,
    borderColor: '#a8b3bb',
    height: 35,
    minWidth: 20,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 0.3,
    shadowOpacity: 0.4,
  },
  interestText: {
    color: '#ffffff',
  },
  checkedImage: {
    width: 70,
    height: 70,
    margin: 5,
    marginTop: 10,
    borderColor: 'rgb(0, 0, 0)',
    borderRadius: 35,
    borderWidth: 2,
  },
  uncheckedImage: {
    width: 70,
    height: 70,
    margin: 5,
    marginTop: 10,
  },
});

const interests = ['animals', 'sports', 'cooking', 'arts', 'travelling',
  'volunteering', 'education', 'finance', 'reading', 'nightlife', 'fitness', 'tech',
  'politics', 'music', 'dancing', 'Tim Tregubov', 'beauty', 'fashion', 'global issues',
  'gaming'];


const profile = [require('../imgs/user-1.png'), require('../imgs/user-2.png'),
  require('../imgs/user-3.png'), require('../imgs/user-4.png'),
  require('../imgs/user-5.png'), require('../imgs/user-6.png'), require('../imgs/user-7.png'), require('../imgs/user-8.png'),
  require('../imgs/user-9.png'), require('../imgs/user-10.png'), require('../imgs/user-11.png')];

class ProfileAdd extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: () => true });
    this.state = {
      email: '',
      password: '',
      interests: [],
      profile: '',
      dataSource: ds.cloneWithRows(profile),
    };
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.renderInterests = this.renderInterests.bind(this);
    this.handleInterest = this.handleInterest.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  updateEmail(text) {
    this.setState({
      email: text,
    });
  }

  updatePassword(text) {
    this.setState({
      password: text,
    });
  }

  // edit the info to the user's model and go to the main match page
  handleSubmit(event) {
    event.preventDefault();
    if (this.state.profile === '') {
      AlertIOS.alert('Make sure you choose a profile picture!');
    } else {
      this.props.addInterests(this.state.interests, this.state.profile.toString());
      this.props.goToSignin();
    }
  }

  // check to see if interests have been checked or not
  handleInterest(interest) {
    if (this.state.interests.includes(interest)) {
      const newstate = [...this.state.interests];
      const index = newstate.indexOf(interest);
      newstate.splice(index, 1);
      this.setState({ interests: newstate });
    } else {
      this.setState({ interests: [...this.state.interests, interest] });
    }
  }

  // change the profile
  handleImage(image) {
    this.setState({
      profile: image,
    });
  }

  // display the interest options
  renderInterests() {
    const interestItems = interests.map((interest) => {
      if (this.state.interests.includes(interest)) {
        return (
          <TouchableOpacity style={styles.checked} key={interest} onPress={(event) => { this.handleInterest(interest); }}>
            <Text style={styles.interestText}>{interest}</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity style={styles.unchecked} key={interest} onPress={(event) => { this.handleInterest(interest); }}>
            <Text style={styles.interestText}>{interest}</Text>
          </TouchableOpacity>
        );
      }
    });
    return (
      <View style={styles.interests}>
        {interestItems}
      </View>
    );
  }

  // display the profile options
  renderImage(item) {
    if (this.state.profile === item) {
      return (
        <TouchableOpacity key={item} onPress={(event) => { this.handleImage(item); }}>
          <Image style={styles.checkedImage} source={item} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity key={item} onPress={(event) => { this.handleImage(item); }}>
          <Image style={styles.uncheckedImage} source={item} />
        </TouchableOpacity>
      );
    }
  }

  // either render the profile interests page or render the main tab view once the editting is done
  renderPage() {
    const ds = new ListView.DataSource({ rowHasChanged: () => true });
    if (this.props.page) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.label}>Choose a photo!</Text>
              <Text style={styles.explanation}>You can change your profile picture at any time.</Text>
            </View>
            <ListView
              horizontal
              removeClippedSubviews={false}
              dataSource={ds.cloneWithRows(profile)}
              renderRow={this.renderImage}
            />
            <View>
              <Text style={styles.label}>Add some interests!</Text>
              <Text style={styles.explanation}>Your interests will appear on your profile for other MunchBuddies to see. </Text>
            </View>
            {this.renderInterests()}
            <View style={styles.buttonBox}>
              <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                <Text style={styles.buttonText}> Ok! </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.container}>
          <MunchBuddyTabs />
        </View>
      );
    }
  }

  render(props) {
    return (
      <View style={styles.container}>
        {this.renderPage()}
      </View>
    );
  }
}

const mapStateToProps = state => (
  {
    error: state.auth.message,
    auth: state.auth.authenticated,
    page: state.auth.page,
  }
);

const mapDispatchToProps = dispatch => (
  {
    goToSignin: () => dispatch(goToSignin()),
    addInterests: (interestList, profile1) => dispatch(editInterests(interestList, profile1)),
  }
);

export default (connect(mapStateToProps,
  mapDispatchToProps)(ProfileAdd));
