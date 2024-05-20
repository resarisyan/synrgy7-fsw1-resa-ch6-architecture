import { Request, Response, NextFunction } from 'express';

export class AuthController {
  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('Login');
      res.render('pages/auth/login');
    } catch (error) {
      next(error);
    }
  }
}
