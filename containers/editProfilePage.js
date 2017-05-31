/*
page to edit user information viewed on profile
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ScrollView, Image, Text, View, ListView, TouchableOpacity, TextInput } from 'react-native';
import ProfilePage from './profilePage';
import { editInterests, pullProfile, editName } from '../actions';

const styles = StyleSheet.create({
  label: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
    color: '#253e47',
  },
  container: {
    flex: 1,
    alignSelf: 'stretch',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputs: {
    alignSelf: 'stretch',
  },
  TextInput: {
    alignSelf: 'center',
    height: 40,
    width: '80%',
    borderColor: '#253a41',
    borderWidth: 1,
    borderRadius: 7,
    paddingLeft: 8,
    color: '#1f343c',
    marginBottom: 10,
  },
  buttonBox: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
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

const interests = ['animals', 'sports', 'cooking', 'arts', 'traveling',
  'volunteering', 'education', 'finance', 'reading', 'nightlife', 'fitness', 'tech',
  'politics', 'music', 'dancing', 'Tim Tregubov', 'beauty', 'fashion', 'global issues', 'gaming'];

const profile = [require('../imgs/user-1.png'), require('../imgs/user-2.png'),
  require('../imgs/user-3.png'), require('../imgs/user-4.png'),
  require('../imgs/user-5.png'), require('../imgs/user-6.png'), require('../imgs/user-7.png'), require('../imgs/user-8.png'),
  require('../imgs/user-9.png'), require('../imgs/user-10.png'), require('../imgs/user-11.png')];

class EditProfile extends Component {

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: () => true });
    this.state = {
      name: this.props.user.fullname,
      interests: this.props.user.interests,
      profile: this.props.user.profile_image,
      dataSource: ds.cloneWithRows(profile),
    };
    this.updateName = this.updateName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImage = this.handleImage.bind(this);
    this.renderInterests = this.renderInterests.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.handleInterest = this.handleInterest.bind(this);
  }

  updateName(text) {
    this.setState({
      name: text,
    });
  }

  // submit profile changes
  handleSubmit(event) {
    event.preventDefault();
    this.props.editInterests(this.state.interests, this.state.profile);
    if (this.props.user.fullname !== this.state.name) {
      this.props.editName(this.state.name);
    }
    this.props.navigator.pop({
      title: 'My Profile',
      leftButtonTitle: ' ',
      component: ProfilePage,
      rightButtonTitle: 'Edit',
      onRightButtonPress: () => {
        this.refs.nav.push({
          title: 'Edit Interests',
          leftButtonTitle: ' ',
          component: EditProfile,
        });
      },
    });
  }

  // update profile image in state
  handleImage(image) {
    this.setState({ profile: image });
  }

  // see if interest was checked or not
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

  // render display of interests
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

  // render list of profile options
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

  render() {
    const ds = new ListView.DataSource({ rowHasChanged: () => true });
    return (
      <ScrollView>
        <Text style={styles.label}>Choose a new profile picture</Text>
        <View style={styles.container}>
          <ListView
            horizontal
            removeClippedSubviews={false}
            dataSource={ds.cloneWithRows(profile)}
            renderRow={this.renderImage}
          />
          <Text style={styles.label}>Edit your name and interests</Text>
          <View style={styles.inputs}>
            <TextInput style={styles.TextInput} onChangeText={this.updateName} defaultValue={this.state.name} />
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
  }
}

const mapStateToProps = state => (
  {
    user: state.auth.user,
  }
);

const mapDispatchToProps = dispatch => (
  {
    editInterests: (interestList, profileImage) => dispatch(editInterests(interestList, profileImage)),
    pullProfile: () => dispatch(pullProfile()),
    editName: name => dispatch(editName(name)),
  }
);

export default (connect(mapStateToProps,
  mapDispatchToProps)(EditProfile));
