import { Router } from 'express';
import passport from '../config/passport';
import * as authController from '../controllers/auth.controller';
import { isAuth } from '../middleware/isAuth';

const router = Router();

router.get(
  '/google',
  passport.authenticate('google', { 
    scope: ['profile', 'email'], 
    session: false
  })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/login-error', 
    session: false
  }),
  authController.googleCallback
);

router.get('/me', isAuth, authController.getMe);

router.post('/logout', authController.logout);

export default router;