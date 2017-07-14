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
  FETCH_TEAM: 'FETCH_TEAM',
  FETCH_TEAM_SOLO_WORKOUTS: 'FETCH_TEAM_SOLO_WORKOUTS',
  FETCH_TEAM_WORKOUTS: 'FETCH_TEAM_WORKOUTS',
};

export function authError(error) {
  return {
    type: ActionTypes.AUTH_ERROR,
    message: error,
  };
}

export function signUpUser({ name, email, password }, history) {
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

export function signInUser({ email, password }, history) {
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

export function signOutUser(history) {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    history.push('/');
  };
}

export function fetchUser(userId) {
  /* use token for authenticated route (repeated in all authenticated routes) */
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/users/${userId}`, headers).then((response) => {
      console.log('User successfully fetched');
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
    }).catch((error) => {
      console.log('fetchUser() failed'); // : ${error.response.data}`);
    });
  };
}

export function updateUser(userId, user) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios PUT call */
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

export function addWorkout({ activity, distance, distUnit, time,
  split, splitDist, splitUnit, strokeRate, watts, avgHR }, userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios POST call */
  return (dispatch) => {
    /* organize parameters into a single object to pass into POST request */
    const info = { activity, distance, distUnit, time, split, splitDist,
      splitUnit, strokeRate, watts, avgHR, userId,
    };
    axios.post(`${ROOT_URL}/workouts/add`, info, headers).then((response) => {
      console.log('Workout added successfully');
      dispatch({ type: ActionTypes.FETCH_USER, payload: response.data });
    }).catch((error) => {
      console.log(`addWorkout() failed: ${error.message}`);
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
      console.log(`fetchWorkout failed: ${error.message}`);
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

export function fetchTeamSoloWorkouts(userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/teamfeed/${userId}`, headers).then((response) => {
      console.log('Team solo workouts fetched successfully');
      dispatch({ type: ActionTypes.FETCH_TEAM_SOLO_WORKOUTS, payload: response.data });
    }).catch((error) => {
      console.log(`fetchTeamSoloWorkouts failed: ${error.message}`);
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
      console.log(`updateWorkout failed: ${error.message}`);
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

export function createTeam({ name, userType }, userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  const info = { name, userType, userId };
  console.log(info);
  /* axios POST call */
  return (dispatch) => {
    axios.post(`${ROOT_URL}/team/add`, info, headers).then((response) => {
      console.log('Team created successfully');
      dispatch({ type: ActionTypes.FETCH_TEAM, payload: response.data });
    }).catch((error) => {
      console.log(`createTeam failed: ${error.message}`);
    });
  };
}

export function joinTeam({ name, userType }, userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  const info = { name, userType, userId };
  console.log(info);
  /* axios POST call */
  return (dispatch) => {
    axios.post(`${ROOT_URL}/team/join`, info, headers).then((response) => {
      console.log('Team joined successfully');
      dispatch({ type: ActionTypes.FETCH_TEAM, payload: response.data });
    }).catch((error) => {
      console.log(`joinTeam failed: ${error.message}`);
    });
  };
}

export function fetchUserTeam(userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/team/${userId}`, headers).then((response) => {
      console.log('Team fetched successfully');
      dispatch({ type: ActionTypes.FETCH_TEAM, payload: response.data });
    }).catch((error) => {
      console.log(`fetchWorkout failed: ${error.message}`);
    });
  };
}

export function addTeamWorkout({ teamId, activity, distance, distUnit, time, type }, userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  const info = { userId, teamId, activity, distance, distUnit, time, type };
  /* axios POST call */
  return (dispatch) => {
    axios.post(`${ROOT_URL}/teamworkout/add`, info, headers).then((response) => {
      console.log('Team workout added successfully');
      dispatch({ type: ActionTypes.FETCH_TEAM, payload: response.data });
    }).catch((error) => {
      console.log(`addTeamWorkout failed: ${error.message}`);
    });
  };
}

export function fetchTeamWorkouts(userId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios GET call */
  return (dispatch) => {
    axios.get(`${ROOT_URL}/teamworkouts/${userId}`, headers).then((response) => {
      console.log('Team workouts fetched successfully');
      dispatch({ type: ActionTypes.FETCH_TEAM_WORKOUTS, payload: response.data });
    }).catch((error) => {
      console.log(`fetchTeamWorkouts failed: ${error.message}`);
    });
  };
}

export function updateTeamWorkout(teamWorkoutId, teamWorkout) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios POST call */
  return (dispatch) => {
    axios.post(`${ROOT_URL}/teamworkouts/${teamWorkoutId}`, teamWorkout, headers).then((response) => {
      console.log('Team workout updated successfully');
      dispatch({ type: ActionTypes.FETCH_TEAM_WORKOUTS, payload: response.data });
    }).catch((error) => {
      console.log(`updateTeamWorkout failed: ${error.message}`);
    });
  };
}

export function deleteTeamWorkout(teamWorkoutId, teamId) {
  const headers = { headers: { authorization: localStorage.getItem('token') } };
  /* axios DELETE call */
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/teamworkouts/${teamWorkoutId}/${teamId}`, headers).then((response) => {
      console.log('Team workout deleted successfully');
      dispatch({ type: ActionTypes.FETCH_TEAM_WORKOUTS, payload: response.data });
    }).catch((error) => {
      console.log(`deleteTeamWorkout failed: ${error.message}`);
    });
  };
}
