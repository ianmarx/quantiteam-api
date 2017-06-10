import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_USER: 'FETCH_USER',
  FETCH_WORKOUTS: 'FETCH_WORKOUTS',
};

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

/* User signup */
export function signUpUser({ name, email, password }, history) {
  /* axios POST call */
  return (dispatch) => {
    const info = { name, email, password };
    axios.post(`${ROOT_URL}/signup`, info).then((response) => {
      console.log('Sign up successful');
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      history.push(`/home/${response.data.id}`);
    }).catch((error) => {
      dispatch(authError(`Sign up failed: ${error.response.data}`));
    });
  };
}

/* User sign in */
export function signInUser({ email, password }, history) {
  /* axios POST */
  return (dispatch) => {
    const info = { email, password };
    axios.post(`${ROOT_URL}/signin`, info).then((response) => {
      console.log('Sign in successful');
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      history.push(`/home/${response.data.id}`);
    }).catch((error) => {
      dispatch(authError(`Sign in failed: ${error.response.data}`));
    });
  };
}

/* User sign out */
export function signOutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

/* Fetch user */
export function fetchUser(userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/${userId}`, headers).then((response) => {
      console.log('User successfully fetched');
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
    }).catch((error) => {
      console.log('Failed to retrieve user');
    });
  };
}

/* Update user */
export function updateUser(userId, user) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios PUT */
  return (dispatch) => {
    axios.put(`${ROOT_URL}/users/${userId}`, user, headers).then((response) => {
      console.log('User successfully updated');
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
    }).catch((error) => {
      console.log('Failed to update post');
    });
  };
}
