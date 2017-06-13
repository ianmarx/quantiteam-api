import { Router } from 'express';
import * as UserController from './controllers/user-controller';
import * as WorkoutController from './controllers/workout-controller';
import { requireSignIn, requireAuth } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.send('This is the Quantiteam API');
});

// Sign up and Sign in
router.post('/signup', UserController.signup);
router.post('/signin', requireSignIn, UserController.signin);

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

router.get('/feed/:userId', requireAuth, WorkoutController.fetchUserWorkouts);

export default router;
