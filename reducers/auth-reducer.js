import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
  message: '',
  page: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      return { authenticated: true };
    case ActionTypes.NEW_ACCOUNT:
      return { page: action.page };
    case ActionTypes.CLEAR_ERROR:
      return { message: action.message };
    case ActionTypes.DEAUTH_USER:
      return { authenticated: false };
    case ActionTypes.AUTH_ERROR:
      return { authenticated: false, message: action.message };
    default:
      return state;
  }
};

export default AuthReducer;
