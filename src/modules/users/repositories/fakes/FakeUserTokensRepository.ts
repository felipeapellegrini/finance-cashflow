import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { v4 } from 'uuid';

class UserTokensRepository implements IUserTokensRepository {
  private tokens: UserToken[] = [];

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.tokens.find(key => key.token === token);

    return userToken;
  }

  public async generateToken(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, { id: v4(), user_id });

    this.tokens.push(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
