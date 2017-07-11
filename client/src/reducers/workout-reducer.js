import { ActionTypes } from '../actions';

const initialState = {
  list: [],
  teamList: [],
};

/* Take in the workout and add it to an array of workouts in the redux state */
const WorkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_WORKOUT: {
      return Object.assign({}, state, {
        list: action.payload,
      });
    }
    case ActionTypes.FETCH_WORKOUTS: {
      return Object.assign({}, state, {
        list: action.payload,
      });
    }
    case ActionTypes.FETCH_TEAM_SOLO_WORKOUTS: {
      return Object.assign({}, state, {
        teamList: action.payload,
      });
    }
    default:
      return state;
  }
};

export default WorkoutReducer;
