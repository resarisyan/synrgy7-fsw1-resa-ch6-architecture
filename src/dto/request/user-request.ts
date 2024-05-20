import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../../models/user-model';
import { EnumRoleUser } from '../../enums/role-user-enum';

export type LoginUserRequest = {
  username: string;
  password: string;
};

export interface UserRequest extends Request {
  user?: User;
  token?: string | JwtPayload;
  role?: EnumRoleUser;
}

export type RegisterUserRequest = {
  name: string;
  username: string;
  password: string;
  role?: EnumRoleUser;
};

export type UpdateUserRequest = {
  name?: string;
  username?: string;
  password?: string;
  role?: EnumRoleUser;
};
