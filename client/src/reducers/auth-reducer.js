import { ActionTypes } from '../actions';

const initialState = {
  authenticated: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      console.log('Reducer: AUTH_USER action triggered');
      return Object.assign({}, state, {
        authenticated: true,
      });
    case ActionTypes.DEAUTH_USER:
      console.log('Reducer: DEAUTH_USER action triggered');
      return Object.assign({}, state, {
        authenticated: false,
      });
    case ActionTypes.AUTH_ERROR:
      console.log('Reducer: AUTH_ERROR action triggered');
      return Object.assign({}, state, {
        authenticated: false,
      });
    default:
      return state;
  }
};

export default AuthReducer;
