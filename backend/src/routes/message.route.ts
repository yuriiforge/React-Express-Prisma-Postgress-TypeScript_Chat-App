import express from 'express';
import protectRoute from '../middleware/protectRoute';
import { messageController } from '../controllers/message.controller';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.post(
  '/send/:id',
  protectRoute,
  asyncHandler(messageController.sendMessage)
);
router.get('/:id', protectRoute, asyncHandler(messageController.getMessages));

export default router;
