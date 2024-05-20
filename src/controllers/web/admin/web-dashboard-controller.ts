import { Request, Response, NextFunction } from 'express';

export class DashboardController {
  static async index(req: Request, res: Response, next: NextFunction) {
    try {
      res.render('pages/admin/dashboard');
    } catch (error) {
      next(error);
    }
  }
}
