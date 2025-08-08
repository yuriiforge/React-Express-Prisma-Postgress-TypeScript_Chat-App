import express from 'express';
import {
  getMe,
  login,
  logout,
  signup,
} from '../controllers/auth.controller.ts';
import protectRoute from '../middleware/protectRoute.ts';

const router = express.Router();

router.get('/me', protectRoute, getMe);

router.post('/login', login);

router.post('/logout', logout);

router.post('/signup', signup);

export default router;
