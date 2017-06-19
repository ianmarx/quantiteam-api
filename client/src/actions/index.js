import axios from 'axios';

const ROOT_URL = 'http://localhost:9090/api';

export const ActionTypes = {
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  FETCH_USER: 'FETCH_USER',
  FETCH_WORKOUT: 'FETCH_WORKOUT',
  FETCH_WORKOUTS: 'FETCH_WORKOUTS',
  DELETE_WORKOUT: 'DELETE_WORKOUT',
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
      console.log('fetchUser() failed'); // : ${error.response.data}`);
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
      console.log('updateUser() failed:');
      console.log(error.response.data);
    });
  };
}

/* Add workout */
export function addWorkout({ activity, distance, distUnit, time,
  split, splitDist, splitUnit, strokeRate, watts, avgHR }, userId, history) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios POST call */
  return (dispatch) => {
    const info = { activity, distance, distUnit, time, split, splitDist,
      splitUnit, strokeRate, watts, avgHR, userId,
    };
    axios.post(`${ROOT_URL}/workouts/add`, info, headers).then((response) => {
      console.log('Workout added successfully');
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
    }).catch((error) => {
      console.log(`addWorkout() failed: ${error.response.data}`);
    });
  };
}

export function fetchWorkout(workoutId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/workouts/${workoutId}`, headers).then((response) => {
      console.log('Workout fetched successfully');
      dispatch({ type: ActionTypes.FETCH_WORKOUT, payload: response.data });
    }).catch((error) => {
      console.log(`fetchWorkout failed: ${error.response.data}`);
    });
  };
}

export function fetchUserWorkouts(userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/feed/${userId}`, headers).then((response) => {
      console.log('Workouts fetched successfully');
      dispatch({ type: ActionTypes.FETCH_WORKOUTS, payload: response.data });
    }).catch((error) => {
      console.log(`fetchUserWorkouts failed: ${error.message}`);
    });
  };
}

export function updateWorkout(workoutId, workout) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios PUT call */
  return (dispatch) => {
    axios.put(`${ROOT_URL}/workouts/${workoutId}`, workout, headers).then((response) => {
      console.log('Workout updated successfully');
      dispatch({ type: ActionTypes.FETCH_WORKOUT, payload: response.data });
    }).catch((error) => {
      console.log(`updateWorkout failed: ${error.response.data}`);
    });
  };
}

export function deleteWorkout(workoutId, userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios DELETE call */
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/workouts/${workoutId}/${userId}`, headers).then((response) => {
      console.log('Workout deleted successfully');
      dispatch({ type: ActionTypes.FETCH_WORKOUTS, payload: response.data });
    }).catch((error) => {
      console.log(`deleteWorkout failed: ${error.message}`);
    });
  };
}
