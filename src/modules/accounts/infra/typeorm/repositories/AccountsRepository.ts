import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import {
  ICreateAccount,
  IFindAll,
  IFindById,
  IFindByName,
} from '@modules/accounts/dtos/IAccountDTO';
import Account from '@modules/accounts/infra/typeorm/entities/Account';
import { Repository, getRepository } from 'typeorm';

class AccountsRepository implements IAccountsRepository {
  private ormRepository: Repository<Account>;

  constructor() {
    this.ormRepository = getRepository(Account);
  }

  public async create({
    name,
    user_id,
    account_type,
  }: ICreateAccount): Promise<Account> {
    const account = this.ormRepository.create({
      name,
      user_id,
      type: account_type,
    });

    await this.ormRepository.save(account);

    return account;
  }

  public async update(account: Account): Promise<Account> {
    return this.ormRepository.save(account);
  }

  public async findByName({
    name,
    user_id,
  }: IFindByName): Promise<Account | undefined> {
    const account = await this.ormRepository.findOne({
      where: {
        user_id,
        name,
      },
    });

    return account;
  }

  public async findById({
    user_id,
    id,
  }: IFindById): Promise<Account | undefined> {
    const account = await this.ormRepository.findOne({
      where: {
        user_id,
        id,
      },
    });

    return account;
  }

  public async findAll({ user_id }: IFindAll): Promise<Account[]> {
    const accounts = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return accounts;
  }
}

export default AccountsRepository;
