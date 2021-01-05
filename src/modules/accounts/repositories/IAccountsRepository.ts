import Account from '@modules/accounts/infra/typeorm/entities/Account';
import {
  ICreateAccount,
  IFindByName,
  IFindById,
  IFindAll,
} from '@modules/accounts/dtos/IAccountDTO';

export default interface IAccountsRepository {
  create(data: ICreateAccount): Promise<Account>;
  update(account: Account): Promise<Account>;
  findByName(data: IFindByName): Promise<Account | undefined>;
  findById(data: IFindById): Promise<Account | undefined>;
  findAll(data: IFindAll): Promise<Account[] | undefined>;
}
