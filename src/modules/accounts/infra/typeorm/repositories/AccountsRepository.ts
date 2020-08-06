import IAccountsRepository from '@modules/accounts/repositories/IAccountsRepository';
import ICreateAccountDTO from '@modules/accounts/dtos/ICreateAccountDTO';
import Account from '@modules/accounts/infra/typeorm/entities/Account';
import { Repository, getRepository } from 'typeorm';

class AccountsRepository implements IAccountsRepository {
  private ormRepository: Repository<Account>;

  constructor() {
    this.ormRepository = getRepository(Account);
  }

  public async create({
    name,
    owner,
    type,
  }: ICreateAccountDTO): Promise<Account> {
    const account = this.ormRepository.create({
      name,
      type,
      owner,
    });

    await this.ormRepository.save(account);

    return account;
  }

  public async findAllByOwnerId(owner_id: string): Promise<Account[]> {
    const accounts = await this.ormRepository.find({
      where: {
        owner: owner_id,
      },
    });

    return accounts;
  }

  public async update(account: Account): Promise<Account> {
    return this.ormRepository.save(account);
  }
}

export default AccountsRepository;
