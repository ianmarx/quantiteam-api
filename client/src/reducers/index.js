import { combineReducers } from 'redux';
import AuthReducer from './auth-reducer';
import UserReducer from './user-reducer';
import WorkoutReducer from './workout-reducer';
import TeamReducer from './team-reducer';
import TeamWorkoutReducer from './team-workout-reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  profile: UserReducer,
  workouts: WorkoutReducer,
  team: TeamReducer,
  teamWorkouts: TeamWorkoutReducer,
});

export default rootReducer;
