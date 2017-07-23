import { ActionTypes } from '../actions';

const initialState = {
  user: {},
  queryResults: [],
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER: {
      return Object.assign({}, state, {
        user: action.payload,
      });
    }
    case ActionTypes.MATCH_ATHLETE: {
      return Object.assign({}, state, {
        queryResults: action.payload,
      });
    }
    default:
      return state;
  }
};

export default UserReducer;
