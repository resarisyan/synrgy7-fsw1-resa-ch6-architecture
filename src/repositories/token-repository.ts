import { Token, TokenModel } from './../models/token-model';
import { KnexRepository } from './knex-repository';

export class TokenRepository extends KnexRepository<TokenModel> {
  public static async findByToken(
    token: string
  ): Promise<TokenModel | undefined> {
    return TokenModel.query().findOne('token', token);
  }

  public static async deleteByToken(token: string): Promise<void> {
    await TokenModel.query().delete().where('token', token);
  }

  public static async insert(item: Partial<Token>): Promise<TokenModel> {
    return TokenModel.query().insert(item);
  }
}
