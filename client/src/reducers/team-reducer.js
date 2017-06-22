import { ActionTypes } from '../actions';

const initialState = {
  team: [],
};

const TeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TEAM: {
      return Object.assign({}, state, {
        team: action.payload,
      });
    }
    default:
      return state;
  }
};

export default TeamReducer;
