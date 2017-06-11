import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import UserReducer from './user-reducer';
import WorkoutReducer from './workout-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  profile: UserReducer,
  workouts: WorkoutReducer,
});

export default rootReducer;
