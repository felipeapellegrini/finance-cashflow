import { uuid } from 'uuidv4';

import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import ICreateAccountDTO from '@modules/accounts/dtos/ICreateAccountDTO';
import Account from '@modules/accounts/infra/typeorm/entities/Account';

class FakeAccountsRepository implements IAccountsRepository {
  private accounts: Account[] = [];

  public async create({
    name,
    user_id,
    type,
  }: ICreateAccountDTO): Promise<Account> {
    const account = new Account();

    Object.assign(account, { id: uuid(), name, user_id, type });

    this.accounts.push(account);

    return account;
  }

  public async update(account: Account): Promise<Account> {
    const findIndex = this.accounts.findIndex(
      findAccount => findAccount.id === account.id,
    );

    this.accounts[findIndex] = account;

    return account;
  }

  public async findByName(
    user_id: string,
    name: string,
  ): Promise<Account | undefined> {
    const findAccount = this.accounts.find(
      account => account.name === name && account.user_id === user_id,
    );

    return findAccount;
  }

  public async findById(
    user_id: string,
    id: string,
  ): Promise<Account | undefined> {
    const findAccount = this.accounts.find(
      account => account.id === id && account.user_id === user_id,
    );

    return findAccount;
  }

  public async findAll(user_id: string): Promise<Account[]> {
    const findAccounts = this.accounts.filter(
      account => account.user_id === user_id,
    );

    return findAccounts;
  }
}

export default FakeAccountsRepository;
