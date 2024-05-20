import express from 'express';
import { DashboardController } from '../../controllers/web/admin/web-dashboard-controller';
export const webAdminRouter = express.Router();

webAdminRouter.get('/dashboard', DashboardController.index);
