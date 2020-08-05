import Account from '@modules/accounts/infra/typeorm/entities/Account';
import ICreateAccountDTO from '@modules/accounts/dtos/ICreateAccountDTO';

export default interface IAccountsRepository {
  create(data: ICreateAccountDTO): Promise<Account>;
  update(account: Account): Promise<Account>;
}
