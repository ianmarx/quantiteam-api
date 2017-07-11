import { ActionTypes } from '../actions';

const initialState = {
  list: [],
};

const TeamWorkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TEAM_WORKOUTS: {
      return Object.assign({}, state, {
        list: action.payload,
      });
    }
    default:
      return state;
  }
};

export default TeamWorkoutReducer;
