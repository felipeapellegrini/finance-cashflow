import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import ICreateAccountDTO from '@modules/accounts/dtos/ICreateAccountDTO';
import Account from '@modules/accounts/infra/typeorm/entities/Account';
import { Repository, getRepository } from 'typeorm';

class AccountsRepository implements IAccountsRepository {
  private ormRepository: Repository<Account>;

  constructor() {
    this.ormRepository = getRepository(Account);
  }

  public async create({ name, type }: ICreateAccountDTO): Promise<Account> {
    const account = this.ormRepository.create({
      name,
      account_type: type,
    });

    await this.ormRepository.save(account);

    return account;
  }

  public async update(account: Account): Promise<Account> {
    return this.ormRepository.save(account);
  }
}

export default AccountsRepository;
