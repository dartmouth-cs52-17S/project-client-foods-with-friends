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
  RECEIVE_MATCH: 'RECEIVE_MATCH',
  RECEIVE_HISTORY: 'RECEIVE_HISTORY',
  CLEAR_MATCH: 'CLEAR_MATCH',
  PULL_PROFILE: 'PULL_PROFILE',
  PULL_OTHER_PROFILE: 'PULL_OTHER_PROFILE',
};

// used to render signin page
export function goToSignin() {
  return {
    type: ActionTypes.NEW_ACCOUNT,
    page: false,
  };
}

// used to render signup page
export function goToSignup() {
  return {
    type: ActionTypes.NEW_ACCOUNT,
    page: true,
  };
}

// used to reset the error message
export function clearError() {
  return {
    type: ActionTypes.CLEAR_ERROR,
    message: '',
  };
}

// create authentication error message
export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

// sign up user
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

// sign in user
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

// sign out the user
export function signoutUser() {
  return (dispatch) => {
    AsyncStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
  };
}

// update interests and profile image for user
export function editInterests(interests, profile) {
  return (dispatch) => {
    AsyncStorage.getItem('token').then((result) => {
      const User = result;
      axios.put(`${ROOT_URL}/interests`, { interests, profile_image: profile }, { headers: { Authorization: User } }).then((response) => {
        dispatch({ type: ActionTypes.PULL_PROFILE, payload: { user: response.data } });
      })
      .catch((error) => {
        console.log(`Cannot update interests: ${error.response.data}`);
      });
    });
  };
}

// update username
export function editName(name) {
  return (dispatch) => {
    AsyncStorage.getItem('token').then((result) => {
      const User = result;
      axios.put(`${ROOT_URL}/updatename`, { fullname: name }, { headers: { Authorization: User } }).then((response) => {
        dispatch({ type: ActionTypes.PULL_PROFILE, payload: { user: response.data } });
      })
      .catch((error) => {
        console.log(`Cannot update name: ${error.response.data}`);
      });
    });
  };
}

// access the users information from api to create profile page
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

// access other users' information from api to create their profile page
export function pullOtherProfile(id) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/user/${id}`).then((response) => {
      dispatch({ type: ActionTypes.PULL_OTHER_PROFILE, payload: { otherUser: response.data } });
    })
    .catch((error) => {
      console.log(`Cannot get profile: ${error.response.data}`);
    });
  };
}

// Post a match request to the api
export function postMatch({ start_time, end_time, topic, loc }) {
  const toPost = {
    topic,
    loc,
    start_time,
    end_time,
  };
  return (dispatch) => {
    AsyncStorage.getItem('token').then((result) => {
      const User = result;
      axios.post(`${ROOT_URL}/matchRequest`, toPost, { headers: { Authorization: User } }).then((response) => {
        dispatch({ type: ActionTypes.POST_MATCH });
      })
      .catch((error) => {
        console.log(`cannot postMatch: ${error.response.data}`);
      });
    });
  };
}

// remove a request from the api
export function removeRequest() {
  return (dispatch) => {
    AsyncStorage.getItem('token').then((result) => {
      const User = result;
      axios.get(`${ROOT_URL}/removeMatchRequest`, { headers: { Authorization: User } }).then((response) => {
      })
      .catch((error) => {
        console.log(`Cannot remove match request: ${error.response.data}`);
      });
    });
  };
}

// search for a match from api
export function getMatchResult() {
  return (dispatch) => {
    AsyncStorage.getItem('token').then((result) => {
      const User = result;
      axios.get(`${ROOT_URL}/getMatchResult`, { headers: { Authorization: User } }).then((response) => {
        if (response.data.InstaMatchedWith !== '') {
          dispatch({ type: ActionTypes.RECEIVE_MATCH, payload: { match: response.data.InstaMatchedWith } });
        }
      })
      .catch((error) => {
        console.log(`Error trying to receive match: ${error.response.data}`);
      });
    });
  };
}

// reset the result obtained by getMatchResult
export function clearMatchResult() {
  return {
    type: ActionTypes.CLEAR_MATCH,
  };
}

// access the user's past matches
export function getMatchHistory() {
  return (dispatch) => {
    AsyncStorage.getItem('token').then((result) => {
      const User = result;
      axios.get(`${ROOT_URL}/matchhistory`, { headers: { Authorization: User } }).then((response) => {
        dispatch({ type: ActionTypes.RECEIVE_HISTORY, payload: { history: response.data } });
      })
      .catch((error) => {
        console.log(`Error trying to receive history: ${error.response.data}`);
      });
    });
  };
}
