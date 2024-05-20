import express from 'express';
import { webAuthRouter } from './web-auth-router';
import { webAdminRouter } from './web-admin-router';
export const webRouter = express.Router();

webRouter.use('/auth', webAuthRouter);
webRouter.use('/admin', webAdminRouter);
