import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, ScrollView } from 'react-native';

import MunchBuddyTabs from '../navigation/tab';
import { goToSignin, editInterests } from '../actions';

const styles = StyleSheet.create({
  label: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 30,
    color: '#253e47',
  },
  explanation: {
    marginTop: 0,
    marginLeft: '10%',
    marginRight: '10%',
    textAlign: 'center',
    fontSize: 17,
    marginBottom: 22,
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
  profiles: {
    width: 80,
    height: 80,
    marginLeft: 10,
    marginRight: 10,
  },
  chosenProfile: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#3694e9',
  },
  profileFlat: {
    marginTop: 10,
    marginBottom: 10,
  },
});

const interests = ['animals', 'sports', 'cooking', 'arts', 'travelling',
  'volunteering', 'education', 'finance', 'reading', 'nightlife', 'fitness', 'tech',
  'politics', 'music', 'dancing', 'Tim Tregubov', 'beauty', 'fashion', 'global issues',
  'gaming'];


const imgs2 = [require('../imgs/cookie.png'), require('../imgs/cupcake.png'),
  require('../imgs/donut.png'), require('../imgs/muffin.png'),
  require('../imgs/pretzel.png')];

class ProfileAdd extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      interests: [],
      profile: '',
    };
    this.updateEmail = this.updateEmail.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderPage = this.renderPage.bind(this);
    this.renderInterests = this.renderInterests.bind(this);
    this.handleInterest = this.handleInterest.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.handleProfile = this.handleProfile.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();
    this.props.addInterests(this.state.interests);
    this.props.goToSignin();
  }

  handleInterest(interest) {
    if (this.state.interests.includes(interest)) {
      const newstate = [...this.state.interests];
      const index = newstate.indexOf(interest);
      console.log(index);
      newstate.splice(index, 1);
      this.setState({ interests: newstate });
      console.log(newstate);
    } else {
      this.setState({ interests: [...this.state.interests, interest] });
    }
  }

  handleProfile(profile1) {
    console.log('profile checked!');
    console.log(profile1);
    console.log('this.state.profile:');
    console.log(this.state.profile);

    if (this.state.profile === profile1) {
      console.log('in me!');
      this.setState({
        profile: '',
      });
    } else {
      console.log('not in me!');
      this.setState({
        profile: profile1,
      });
    }
  }

  renderInterests() {
    const interestItems = interests.map((interest) => {
      if (this.state.interests.includes(interest)) {
        return (
          <TouchableOpacity style={styles.checked} key={interest} onPress={() => { this.handleInterest(interest); }}>
            <Text style={styles.interestText}>{interest}</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity style={styles.unchecked} key={interest} onPress={() => { this.handleInterest(interest); }}>
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

  renderImage(item) {
    console.log('item');
    console.log(item.item);
    let style;
    if (this.state.profile === item) {
      style = [styles.profiles, styles.chosenProfile];
    } else {
      style = [styles.profiles];
    }
    return (
      <TouchableOpacity key={item.item} onPress={(profile) => { this.handleProfile(item.item); }}>
        <Image source={item.item} style={style} />
      </TouchableOpacity>
    );
  }

  renderPage() {
    const imgs = ['../imgs/cookie.png', '../imgs/cupcake.png',
      '../imgs/donut.png', '../imgs/muffin.png', '../imgs/pretzel.png'];

    if (this.props.page) {
      return (
        <ScrollView>
          <View style={styles.container}>
            <View>
              <Text style={styles.label}>Choose a photo!</Text>
              <Text style={styles.explanation}>You can change your profile picture at any time.</Text>
            </View>
            <FlatList
              horizontal
              data={imgs2}
              style={styles.profileFlat}
              renderItem={this.renderImage}
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
    addInterests: interestList => dispatch(editInterests(interestList)),
  }
);

export default (connect(mapStateToProps,
  mapDispatchToProps)(ProfileAdd));
