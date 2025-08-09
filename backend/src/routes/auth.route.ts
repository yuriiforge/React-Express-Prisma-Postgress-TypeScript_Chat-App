import express from 'express';
import { authController } from '../controllers/auth.controller.ts';
import protectRoute from '../middleware/protectRoute.ts';
import { asyncHandler } from '../middleware/asyncHandler.ts';

const router = express.Router();

router.get('/me', protectRoute, asyncHandler(authController.getMe));

router.post('/login', asyncHandler(authController.login));

router.post('/logout', asyncHandler(authController.logout));

router.post('/signup', asyncHandler(authController.signup));

export default router;
