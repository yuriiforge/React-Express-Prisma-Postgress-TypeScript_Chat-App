import express from 'express';
import { authController } from '../controllers/auth.controller.ts';
import protectRoute from '../middleware/protectRoute.ts';

const router = express.Router();

router.get('/me', protectRoute, authController.getMe);

router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.post('/signup', authController.signup);

export default router;
