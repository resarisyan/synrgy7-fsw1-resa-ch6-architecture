import { UserRepository } from './../repositories/user-repository';
import bcrypt from 'bcrypt';
import { Validation } from '../validations';
import { UserValidation } from '../validations/user-validation';
import {
  LoginUserRequest,
  RegisterUserRequest,
} from '../dto/request/user-request';
import { UserResponse } from '../dto/response/user-response';
import { UserModel } from '../models/user-model';
import { ResponseError } from '../handlers/response-error';
import jwt from 'jsonwebtoken';
import { EnumRoleUser } from '../enums/role-user-enum';
import { TokenRepository } from '../repositories/token-repository';

export class UserService {
  public static async login(req: LoginUserRequest): Promise<UserResponse> {
    const loginRequest = Validation.validate(UserValidation.LOGIN, req);
    let user = await UserModel.query().findOne(
      'username',
      loginRequest.username
    );
    if (
      !user ||
      !(await bcrypt.compare(loginRequest.password, user.password))
    ) {
      throw new ResponseError(401, 'Invalid username or password');
    }

    const jwtToken = jwt.sign(
      { id: user.id.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    );

    const dataToken = await TokenRepository.insert({
      token: jwtToken,
      user_id: user.id,
      expires_at: new Date(Date.now() + 86400000),
      is_revoked: false,
    });

    return {
      username: user.username,
      name: user.name,
      token: dataToken.token,
    };
  }

  public static async register(
    req: RegisterUserRequest
  ): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.REGISTER, req);
    const user = await UserRepository.findByUsername(registerRequest.username);
    if (user) {
      throw new ResponseError(400, 'Username already exists');
    }

    const hashedPassword = await bcrypt.hash(registerRequest.password, 10);
    const dataUser = await UserRepository.insert({
      username: registerRequest.username,
      password: hashedPassword,
      name: registerRequest.name,
      role: EnumRoleUser.CUSTOMER,
    });
    return {
      username: dataUser.username,
      name: dataUser.name,
    };
  }

  static async update(
    id: number,
    req: RegisterUserRequest
  ): Promise<UserResponse> {
    const registerRequest = Validation.validate(UserValidation.REGISTER, req);
    const user = await UserRepository.findById(id);
    if (!user) {
      throw new ResponseError(404, 'User not found');
    }

    if (registerRequest.username) {
      const user = await UserRepository.findByUsername(
        registerRequest.username
      );
      if (user) {
        throw new ResponseError(400, 'Username already exists');
      }
    }

    if (registerRequest.password) {
      registerRequest.password = await bcrypt.hash(
        registerRequest.password,
        10
      );
    }

    user.username = registerRequest.username || user.username;
    user.password = registerRequest.password || user.password;
    user.name = registerRequest.name || user.name;
    user.role = registerRequest.role || user.role;
    await user.$query().patch();

    return {
      username: user.username,
      name: user.name,
    };
  }

  public static async logout(token: string): Promise<void> {
    await TokenRepository.deleteByToken(token);
  }
}
