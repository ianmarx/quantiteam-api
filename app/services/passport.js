import passport from 'passport';
import LocalStrategy from 'passport-local';
import dotenv from 'dotenv';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../models/user-model';

dotenv.config({ silent: true });

const localOptions = { usernameField: 'email' };

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.AUTH_SECRET,
};

/* Verify user by email/password */
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, '+password', (err, user) => {
    if (err) { return done(err); }
    if (!user) { return done(null, false); }

    /* Check for a password match */
    user.validatePassword(password, (err, isMatch) => {
      if (err) {
        done(err);
      } else if (!isMatch) {
        done(null, false);
      } else {
        done(null, user);
      }
    });
  });
});

/* Verify user by request token */
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub, (err, user) => {
    if (err) {
      done(err, false);
    } else if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

/* Indicate both strategies to passport */
passport.use(localLogin);
passport.use(jwtLogin);

export const requireSignIn = passport.authenticate('local', { session: false });
export const requireAuth = passport.authenticate('jwt', { session: false });
