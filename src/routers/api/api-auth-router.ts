import express from 'express';
import { AuthController } from '../../controllers/api/api-auth-controller';
import { authMiddleware } from '../../middlewares/auth-middleware';
export const apiAuthRouter = express.Router();

apiAuthRouter.post('/login', AuthController.login);
apiAuthRouter.post('/logout', authMiddleware, AuthController.logout);
apiAuthRouter.post('/register', AuthController.register);
apiAuthRouter.put('/update', authMiddleware, AuthController.update);
