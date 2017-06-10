import { ActionTypes } from '../actions';

const initialState = {
  user: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER: {
      return Object.assign({}, state, {
        user: action.payload,
      });
    }
    default:
      return state;
  }
};

export default UserReducer;
