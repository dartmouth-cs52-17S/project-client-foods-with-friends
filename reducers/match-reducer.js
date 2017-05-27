import { ActionTypes } from '../actions';

const initialState = {
  match: false,
  receivedMatch: null,
  receivedHistory: null,
};

const MatchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.POST_MATCH:
      return Object.assign({}, state, {
        match: true,
      });
    case ActionTypes.RECEIVE_MATCH:
      return Object.assign({}, state, {
        receivedMatch: action.payload.match,
      });
    case ActionTypes.RECEIVE_HISTORY:
      return Object.assign({}, state, {
        receivedMatch: action.payload.match,
      });
    case ActionTypes.CLEAR_MATCH:
      return Object.assign({}, state, {
        receivedMatch: null,
      });
    default:
      return state;
  }
};

export default MatchReducer;
