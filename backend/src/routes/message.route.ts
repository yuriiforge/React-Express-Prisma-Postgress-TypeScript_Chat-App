import express from 'express';
import protectRoute from '../middleware/protectRoute';
import { messageController } from '../controllers/message.controller';
import { asyncHandler } from '../middleware/asyncHandler';

const router = express.Router();

router.get(
  '/conversations',
  protectRoute,
  asyncHandler(messageController.getUsersForSidebar)
);
router.get('/:id', protectRoute, asyncHandler(messageController.getMessages));
router.post(
  '/send/:id',
  protectRoute,
  asyncHandler(messageController.sendMessage)
);

export default router;
