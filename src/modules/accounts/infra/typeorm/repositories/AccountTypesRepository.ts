import IAccountTypesRepository from '@modules/accounts/repositories/IAccountTypesRepository';
import { getRepository, Repository } from 'typeorm';
import AccountType from '../entities/AccountType';

class AccountTypesRepository implements IAccountTypesRepository {
  private ormRepository: Repository<AccountType>;

  constructor() {
    this.ormRepository = getRepository(AccountType);
  }

  public async create(name: string): Promise<AccountType> {
    const accountType = this.ormRepository.create({ name });

    await this.ormRepository.save(accountType);

    return accountType;
  }

  public async update(accountType: AccountType): Promise<AccountType> {
    return this.ormRepository.save(accountType);
  }

  public async findByName(name: string): Promise<AccountType | undefined> {
    const accountType = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return accountType;
  }

  public async findById(id: string): Promise<AccountType | undefined> {
    const accountType = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return accountType;
  }

  public async delete(account_type: AccountType): Promise<void> {
    await this.ormRepository.remove(account_type);
  }
}

export default AccountTypesRepository;
