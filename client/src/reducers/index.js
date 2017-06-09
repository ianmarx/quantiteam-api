import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import UserReducer from './user-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  profile: UserReducer,
});

export default rootReducer;
