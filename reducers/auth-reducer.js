import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  message: '',
  page: false,
  user: null,
  otherUser: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return Object.assign({}, state, {
        authenticated: true,
      });
    case ActionTypes.NEW_ACCOUNT:
      return Object.assign({}, state, {
        page: action.page,
      });
    case ActionTypes.CLEAR_ERROR:
      return Object.assign({}, state, {
        message: action.message,
      });
    case ActionTypes.DEAUTH_USER:
      return Object.assign({}, state, {
        authenticated: false,
      });
    case ActionTypes.AUTH_ERROR:
      return Object.assign({}, state, {
        authenticated: false,
        message: action.message,
      });
    case ActionTypes.PULL_PROFILE:
      return Object.assign({}, state, {
        user: action.payload.user,
      });
    case ActionTypes.PULL_OTHER_PROFILE:
      return Object.assign({}, state, {
        otherUser: action.payload.otherUser,
      });
    default:
      return state;
  }
};

export default AuthReducer;
