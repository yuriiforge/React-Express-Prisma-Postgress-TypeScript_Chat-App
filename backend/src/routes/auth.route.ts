import express from 'express';
import { authController } from '../controllers/auth.controller';
import protectRoute from '../middleware/protectRoute';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.get('/me', protectRoute, asyncHandler(authController.getMe));

router.post('/login', asyncHandler(authController.login));

router.post('/logout', asyncHandler(authController.logout));

router.post('/signup', asyncHandler(authController.signup));

export default router;
