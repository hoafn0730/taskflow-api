import express from 'express';
import { StatusCodes } from 'http-status-codes';

import boardRouter from './boardRouter';
import columnRouter from './columnRouter';
import cardRouter from './cardRouter';
import userRouter from './userRouter';
import checklistRouter from './checklistRouter';
import attachmentRouter from './attachmentRouter';
import memberRouter from './memberRouter';
import commentRouter from './commentRouter';
import notificationRouter from './notificationRouter';
import workspaceRouter from './workspaceRouter';
import authMiddleware from '~/middlewares/authMiddleware';

const router = express.Router();

router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'Hello world!' });
});

router.all('*', authMiddleware.isAuthorized);
router.use('/boards', boardRouter);
router.use('/columns', columnRouter);
router.use('/cards', cardRouter);
router.use('/checklists', checklistRouter);
router.use('/attachments', attachmentRouter);
router.use('/members', memberRouter);
router.use('/comments', commentRouter);
router.use('/notifications', notificationRouter);
router.use('/users', userRouter);
router.use('/workspaces', workspaceRouter);

export default router;
