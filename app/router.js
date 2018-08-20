import { Router } from 'express';
import * as UserController from './controllers/user-controller';
import * as WorkoutController from './controllers/workout-controller';
import * as TeamController from './controllers/team-controller';
import * as TeamWorkoutController from './controllers/team-workout-controller';
import { requireSignIn, requireAuth } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.send('This is the Quantiteam API');
});

// Sign up and Sign in
router.post('/signup/athlete', UserController.signUpAthlete);
router.post('/signup/coach', UserController.signUpCoach);
router.post('/signin', requireSignIn, UserController.signin);

// Return/update user information
router.route('/users/:userId')
  .get(requireAuth, UserController.fetchUser)
  .put(requireAuth, UserController.updateUser);

router.get('/profile/:userId', requireAuth, UserController.fetchUserProfile);

// Add workout
router.post('/workouts/add', requireAuth, WorkoutController.addWorkout);

// Return/update workout information
router.route('/workouts/:workoutId')
  .get(requireAuth, WorkoutController.fetchWorkout)
  .put(requireAuth, WorkoutController.updateWorkout);

// Delete workout from the db
router.delete('/workouts/:workoutId/:userId', requireAuth, WorkoutController.deleteWorkout);

// Fetch a user's individual workouts
router.get('/feed/:userId', requireAuth, WorkoutController.fetchUserWorkouts);

// Fetch all individual workouts associated with a team
router.get('/teamfeed/:userId', requireAuth, WorkoutController.fetchTeamSoloWorkouts);

router.get('/team/name/:query', TeamController.checkTeamNameAvailability);
router.get('/team/code/:teamCode', TeamController.checkTeamCodeValidity);

router.get('/team/:userId', requireAuth, TeamController.fetchUserTeam);

router.post('/teamworkouts/add', requireAuth, TeamWorkoutController.addTeamWorkout);
router.get('/teamworkouts/:userId', requireAuth, TeamWorkoutController.fetchTeamWorkouts);

router.post('/teamworkouts/:teamWorkoutId', requireAuth, TeamWorkoutController.updateTeamWorkout);
router.get('/teamworkout/:teamWorkoutId', requireAuth, TeamWorkoutController.fetchTeamWorkout);

router.delete('/teamworkouts/:teamWorkoutId/:teamId', requireAuth, TeamWorkoutController.deleteTeamWorkout);

router.post('/result/add/:teamWorkoutId', requireAuth, TeamWorkoutController.addResult);
router.get('/results/dist/:teamWorkoutId', requireAuth, TeamWorkoutController.fetchDistResults);
router.get('/results/time/:teamWorkoutId', requireAuth, TeamWorkoutController.fetchTimeResults);
router.delete('/results/:workoutId/:teamWorkoutId', requireAuth, TeamWorkoutController.deleteResult);

router.get('/athletes/:teamId/:query', requireAuth, UserController.matchAthlete);

router.get('/totals/:userId', requireAuth, WorkoutController.fetchUserDistTotals);

export default router;
