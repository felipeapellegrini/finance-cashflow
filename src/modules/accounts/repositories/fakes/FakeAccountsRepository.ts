import { v4 } from 'uuid';

import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import {
  ICreateAccount,
  IFindAll,
  IFindById,
  IFindByName,
} from '@modules/accounts/dtos/IAccountDTO';
import Account from '@modules/accounts/infra/typeorm/entities/Account';

class FakeAccountsRepository implements IAccountsRepository {
  private accounts: Account[] = [];

  public async create({
    name,
    user_id,
    account_type,
  }: ICreateAccount): Promise<Account> {
    const account = new Account();

    Object.assign(account, { id: v4(), name, user_id, account_type });

    this.accounts.push(account);

    return account;
  }

  public async update(account: Account): Promise<Account> {
    const findIndex = this.accounts.findIndex(
      findAccount =>
        findAccount.id === account.id &&
        findAccount.user_id === account.user_id,
    );

    this.accounts[findIndex] = account;

    return account;
  }

  public async findByName({
    user_id,
    name,
  }: IFindByName): Promise<Account | undefined> {
    const findAccount = this.accounts.find(
      account => account.name === name && account.user_id === user_id,
    );

    return findAccount;
  }

  public async findById({
    user_id,
    id,
  }: IFindById): Promise<Account | undefined> {
    const findAccount = this.accounts.find(
      account => account.id === id && account.user_id === user_id,
    );

    return findAccount;
  }

  public async findAll({ user_id }: IFindAll): Promise<Account[]> {
    const findAccounts = this.accounts.filter(
      account => account.user_id === user_id,
    );

    return findAccounts;
  }
}

export default FakeAccountsRepository;
