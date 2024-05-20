import express from 'express';
import { AuthController } from '../../controllers/web/web-auth-controller';
export const webAuthRouter = express.Router();

webAuthRouter.get('/login', AuthController.login);
