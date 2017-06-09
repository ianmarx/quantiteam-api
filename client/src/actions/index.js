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
      console.log('Sign up succeessful');
      dispatch({ type: ActionTypes.AUTH_USER });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.id);
      history.push(`/home/${response.data.id}`);
    }).catch((error) => {
      dispatch(authError(`Sign up failed: ${error.response.data}`));
    });
  };
}
