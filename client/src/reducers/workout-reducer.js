import { ActionTypes } from '../actions';

const initialState = {
  list: {},
};

/* Take in the workout and add it to an array of workouts in the redux state */
const WorkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_WORKOUT: {
      return Object.assign({}, state, {
        list: action.payload,
      });
    }
    default:
      return state;
  }
};

export default WorkoutReducer;
