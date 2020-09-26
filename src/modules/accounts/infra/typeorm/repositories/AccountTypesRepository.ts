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
}

export default AccountTypesRepository;
