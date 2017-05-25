import { combineReducers } from 'redux';

import AuthReducer from './auth-reducer';
import MatchReducer from './match-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  match: MatchReducer,
});

export default rootReducer;
