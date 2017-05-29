import axios from 'axios';
import { AsyncStorage } from 'react-native';

const ROOT_URL = 'https://munchbuddy.herokuapp.com/api';
// NOTE: Change this ROOT_URL when testing with local server
// const ROOT_URL = 'http://localhost:9090/api';

export const ActionTypes = {
  AUTH_ERROR: 'AUTH_ERROR',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_USER: 'AUTH_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
  NEW_ACCOUNT: 'NEW_ACCOUNT',
  POST_MATCH: 'POST_MATCH',
  RECEIVE_MATCH: 'RECEIVE_MATCH',
  RECEIVE_HISTORY: 'RECEIVE_HISTORY',
  CLEAR_MATCH: 'CLEAR_MATCH',
  PULL_PROFILE: 'PULL_PROFILE',
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
  console.log('in signupUser');
  return (dispatch) => {
    axios.post(`${ROOT_URL}/signup`, { fullname, email, password }).then((response) => {
      console.log('made it through axios post');
      dispatch({ type: ActionTypes.AUTH_USER });
      AsyncStorage.setItem('token', response.data.token);
    })
    .catch((error) => {
      console.log('signupUser failed');
      console.log(error);
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

export function editInterests(interests, profile) {
  let newProfile;
  if (profile === '' || profile === null) {
    newProfile = '1';
  } else {
    newProfile = profile;
  }
  return (dispatch) => {
    AsyncStorage.getItem('token').then((result) => {
      const User = result;
      axios.put(`${ROOT_URL}/interests`, { interests, newProfile }, { headers: { Authorization: User } }).then((response) => {
        dispatch({ type: ActionTypes.PULL_PROFILE, payload: { user: response.data } });
      })
      .catch((error) => {
        console.log(`Cannot update interests: ${error.response.data}`);
      });
    });
  };
}

export function editName(name) {
  return (dispatch) => {
    AsyncStorage.getItem('token').then((result) => {
      const User = result;
      axios.put(`${ROOT_URL}/updatename`, { fullname: name }, { headers: { Authorization: User } }).then((response) => {
        dispatch({ type: ActionTypes.PULL_PROFILE, payload: { user: response.data } });
        console.log('posted successfully to update name!');
      })
      .catch((error) => {
        console.log(`Cannot update name: ${error.response.data}`);
      });
    });
  };
}

export function pullProfile() {
  return (dispatch) => {
    AsyncStorage.getItem('token').then((result) => {
      const User = result;
      axios.get(`${ROOT_URL}/userprofile`, { headers: { Authorization: User } }).then((response) => {
        dispatch({ type: ActionTypes.PULL_PROFILE, payload: { user: response.data[0] } });
      })
      .catch((error) => {
        console.log(`Cannot get profile: ${error.response.data}`);
      });
    });
  };
}

export function getMatchResult() {
  return (dispatch) => {
    AsyncStorage.getItem('token').then((result) => {
      const User = result;
      axios.get(`${ROOT_URL}/getMatchResult`, { headers: { Authorization: User } }).then((response) => {
        if (response.data.InstaMatchedWith !== '') {
          console.log('matched!');
          dispatch({ type: ActionTypes.RECEIVE_MATCH, payload: { match: response.data.InstaMatchedWith } });
        } else {
          console.log(`sad ${response.data.InstaMatchedWith}`);
        }
      })
      .catch((error) => {
        console.log(`Error trying to receive match: ${error}`);
      });
    });
  };
}

export function getMatchHistory() {
  return (dispatch) => {
    AsyncStorage.getItem('token').then((result) => {
      const User = result;
      axios.get(`${ROOT_URL}/matchhistory`, { headers: { Authorization: User } }).then((response) => {
        dispatch({ type: ActionTypes.RECEIVE_HISTORY, payload: { history: response.data } });
        console.log('print meeeeee');
        console.log(response.data);
      })
      .catch((error) => {
        console.log(`Error trying to receive history: ${error.response.data}`);
      });
    });
  };
}

export function clearMatchResult() {
  return {
    type: ActionTypes.CLEAR_MATCH,
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
        console.log(`cannot postMatch: ${error.response.data}`);
      });
    });
  };
}


export function signoutUser() {
  return (dispatch) => {
    AsyncStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
  };
}
