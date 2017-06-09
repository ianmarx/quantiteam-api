import { Router } from 'express';
import * as UserController from './controllers/user-controller';
import { requireSignIn, requireAuth } from './services/passport';

const router = Router();

router.get('/', (req, res) => {
  res.send('This is the Quantiteam API');
});

// Sign up and Sign in
router.post('/signup', UserController.signup);
router.post('/signin', requireSignIn, UserController.signin);

// Return user information
router.route('/users/:userId')
  .get(requireAuth, UserController.fetchUser)
  .put(requireAuth, UserController.updateUser);

export default router;
