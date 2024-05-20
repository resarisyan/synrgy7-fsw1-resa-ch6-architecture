import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../services/user-service';
import {
  LoginUserRequest,
  RegisterUserRequest,
  UserRequest,
} from '../../dto/request/user-request';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: LoginUserRequest = req.body as LoginUserRequest;
      const response = await UserService.login(request);
      res.json({
        success: true,
        message: 'User logged in',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async logout(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const token = req.token as string;
      await UserService.logout(token);
      res.json({
        success: true,
        message: 'User logged out',
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: RegisterUserRequest = req.body as RegisterUserRequest;
      const response = await UserService.register(request);
      res.json({
        success: true,
        message: 'User registered',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: UserRequest, res: Response, next: NextFunction) {
    try {
      const request: RegisterUserRequest = req.body as RegisterUserRequest;
      const userId = req.user?.id as number;
      const response = await UserService.update(userId, request);
      res.json({
        success: true,
        message: 'User updated',
        data: response,
      });
    } catch (error) {
      next(error);
    }
  }
}
