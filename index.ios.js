import React, { Component } from 'react';
import { View, StyleSheet, AsyncStorage, AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Navigator from './navigation/navigator';
import { ActionTypes } from './actions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));
AsyncStorage.getItem('token').then((response) => {
  if (response !== null) {
    store.dispatch({ type: ActionTypes.AUTH_USER });
  }
}).catch((err) => {
  console.log(err);
});

export default class foodswithfriends extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Navigator />
        </View>
      </Provider>
    );
  }
}

AppRegistry.registerComponent('foodswithfriends', () => foodswithfriends);
