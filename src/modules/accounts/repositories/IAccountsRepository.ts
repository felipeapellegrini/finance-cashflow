import Account from '@modules/accounts/infra/typeorm/entities/Account';
import ICreateAccountDTO from '@modules/accounts/dtos/ICreateAccountDTO';

export default interface IAccountsRepository {
  create(data: ICreateAccountDTO): Promise<Account>;
  update(account: Account): Promise<Account>;
  findByName(user_id: string, name: string): Promise<Account | undefined>;
  findById(user_id: string, id: string): Promise<Account | undefined>;
  findAll(user_id: string): Promise<Account[] | undefined>;
}
