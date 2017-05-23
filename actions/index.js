import axios from 'axios';
import { AsyncStorage } from 'react-native';

const ROOT_URL = 'https://munchees.herokuapp.com/api';

export const ActionTypes = {
  AUTH_ERROR: 'AUTH_ERROR',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_USER: 'AUTH_USER',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

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

export function signoutUser() {
  return (dispatch) => {
    AsyncStorage.removeItem('token');
    dispatch({ type: ActionTypes.DEAUTH_USER });
  };
}
