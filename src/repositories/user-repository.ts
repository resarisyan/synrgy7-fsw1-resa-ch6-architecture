import { User, UserModel } from '../models/user-model';
import { KnexRepository } from './knex-repository';

export class UserRepository extends KnexRepository<UserModel> {
  public static async findByUsername(
    username: string
  ): Promise<UserModel | undefined> {
    return UserModel.query().findOne('username', username);
  }

  public static async findById(id: number): Promise<UserModel | undefined> {
    return UserModel.query().findById(id);
  }

  public static async insert(item: Partial<User>): Promise<UserModel> {
    return UserModel.query().insert(item);
  }
}
