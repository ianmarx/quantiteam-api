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
router.post('/signup', UserController.signup);
router.post('/signin', requireSignIn, UserController.signin);

// Return all users in the db
router.get('/users', requireAuth, UserController.fetchAllUsers);

// Return/update user information
router.route('/users/:userId')
  .get(requireAuth, UserController.fetchUser)
  .put(requireAuth, UserController.updateUser);

// Add workout
router.post('/workouts/add', requireAuth, WorkoutController.addWorkout);

// Return/update workout information
router.route('/workouts/:workoutId')
  .get(requireAuth, WorkoutController.fetchWorkout)
  .put(requireAuth, WorkoutController.updateWorkout);

// Delete workout from the db
router.route('/workouts/:workoutId/:userId')
  .delete(requireAuth, WorkoutController.deleteWorkout);

// Fetch a user's individual workouts
router.get('/feed/:userId', requireAuth, WorkoutController.fetchUserWorkouts);

// Fetch all individual workouts associated with a team
router.get('/teamfeed/:userId', requireAuth, WorkoutController.fetchTeamWorkouts);

// Create and join a team
router.post('/team/create', requireAuth, TeamController.createTeam);
router.post('/team/join', requireAuth, TeamController.joinTeam);

router.route('/team/:userId')
  .get(requireAuth, TeamController.fetchUserTeam);

router.post('/teamworkout/add', requireAuth, TeamWorkoutController.addTeamWorkout);

export default router;
