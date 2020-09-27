import ICreateAccountTypeDTO from '@modules/accounts/dtos/ICreateAccountTypeDTO';
import IAccountTypesRepository from '@modules/accounts/repositories/IAccountTypesRepository';
import { getRepository, Repository } from 'typeorm';
import AccountType from '../entities/AccountType';

class AccountTypesRepository implements IAccountTypesRepository {
  private ormRepository: Repository<AccountType>;

  constructor() {
    this.ormRepository = getRepository(AccountType);
  }

  public async create({
    user_id,
    name,
  }: ICreateAccountTypeDTO): Promise<AccountType> {
    const accountType = this.ormRepository.create({ name, user_id });

    await this.ormRepository.save(accountType);

    return accountType;
  }

  public async update(accountType: AccountType): Promise<AccountType> {
    return this.ormRepository.save(accountType);
  }

  public async findByName({
    user_id,
    name,
  }: ICreateAccountTypeDTO): Promise<AccountType | undefined> {
    const accountType = this.ormRepository.findOne({
      where: {
        user_id,
        name,
      },
    });

    return accountType;
  }

  public async findById(
    user_id: string,
    id: string,
  ): Promise<AccountType | undefined> {
    const accountType = await this.ormRepository.findOne({
      where: {
        user_id,
        id,
      },
    });

    return accountType;
  }

  public async delete(account_type: AccountType): Promise<void> {
    await this.ormRepository.remove(account_type);
  }

  public async findAll(user_id: string): Promise<AccountType[]> {
    const accountTypes = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return accountTypes;
  }
}

export default AccountTypesRepository;
