import { ActionTypes } from '../actions';

const initialState = {
  list: [],
  current: {},
  results: [],
};

const TeamWorkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TEAM_WORKOUTS: {
      return Object.assign({}, state, {
        list: action.payload,
      });
    }
    case ActionTypes.FETCH_TEAM_WORKOUT: {
      return Object.assign({}, state, {
        current: action.payload,
      });
    }
    case ActionTypes.FETCH_RESULTS: {
      return Object.assign({}, state, {
        results: action.payload,
      });
    }
    default:
      return state;
  }
};

export default TeamWorkoutReducer;
