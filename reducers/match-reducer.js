import { ActionTypes } from '../actions';

const initialState = {
  match: false,
};

const MatchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.POST_MATCH:
      return Object.assign({}, state, {
        match: true,
      });
    default:
      return state;
  }
};

export default MatchReducer;
