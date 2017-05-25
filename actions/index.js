import axios from 'axios';
import { AsyncStorage } from 'react-native';

const ROOT_URL = 'https://munchbuddy.herokuapp.com/api';

export const ActionTypes = {
  AUTH_ERROR: 'AUTH_ERROR',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_USER: 'AUTH_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  NEW_ACCOUNT: 'NEW_ACCOUNT',
  POST_MATCH: 'POST_MATCH',
};


export function goToSignin() {
  return {
    type: ActionTypes.NEW_ACCOUNT,
    page: false,
  };
}

export function goToSignup() {
  return {
    type: ActionTypes.NEW_ACCOUNT,
    page: true,
  };
}

export function clearError() {
  return {
    type: ActionTypes.CLEAR_ERROR,
    message: '',
  };
}

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signupUser({ fullname, email, password }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { fullname, email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      AsyncStorage.setItem('token', response.data.token);
    })
    .catch((error) => {
      dispatch(authError(`Sign up Failed: ${error.response.data}`));
    });
  };
}

export function signinUser({ email, password }) {
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signin`, { email, password }).then((response) => {
      dispatch({ type: ActionTypes.AUTH_USER });
      AsyncStorage.setItem('token', response.data.token);
    })
    .catch((error) => {
      dispatch(authError(`Sign in Failed: ${error.response.data}`));
    });
  };
}

export function editInterests(interests) {
  return (dispatch) => {
    AsyncStorage.getItem('token').then((result) => {
      const User = result;
      console.log(interests);
      axios.put(`${ROOT_URL}/interests`, interests, { headers: { Authorization: User } }).then((response) => {
        console.log('posted successfully to update interests!');
      })
      .catch((error) => {
        console.log(`Cannot update interests: ${error.response.data}`);
      });
    });
  };
}

export function postMatch({ start_time, end_time, topic, loc }) {
  console.log('in postMatch function');
  const toPost = {
    topic,
    loc,
    start_time,
    end_time,
  };
  return (dispatch) => {
    console.log('beginning of dispatch');
    AsyncStorage.getItem('token').then((result) => {
      console.log('in getItem somewhere?');
      console.log(result);
      const User = result;
      axios.post(`${ROOT_URL}/matchRequest`, toPost, { headers: { Authorization: User } }).then((response) => {
        console.log('posted successfully to match request');
        dispatch({ type: ActionTypes.POST_MATCH });
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
        dispatch(authError(`cannot postMatch: ${error.response.data}`));
      });
    });
  };
}
/*
export function postMatch({ start_time, end_time, topic, loc }) {
  console.log('in postMatch function');
  const toPost = {
    start_time,
    end_time,
    topic,
    loc,
  };
  return (dispatch) => {
    console.log('beginning of dispatch');
       axios.post(`${ROOT_URL}/matchRequest`, toPost, { headers: { authorization: AsyncStorage.getItem('token') } }).then((response) => {
        console.log('posted successfully to match request');
        dispatch({ type: ActionTypes.POST_MATCH });
      })
      .catch((error) => {
        console.log('error');
        console.log(error);
        dispatch(authError(`cannot postMatch: ${error.response.data}`));
      });
    });
  };
}
*/


export function signoutUser() {
  return (dispatch) => {
    AsyncStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
  };
}
