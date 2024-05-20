import express from 'express';
import { apiAuthRouter } from './api-auth-router';
import { errorMiddleware } from '../../middlewares/error-middleware';
export const apiRouter = express.Router();

apiRouter.use('/auth', apiAuthRouter);
apiRouter.use(errorMiddleware);
