import { uuid } from 'uuidv4';
import ICreateAccountTypeDTO from '../../dtos/ICreateAccountTypeDTO';
import IAccountTypesRepository from '../IAccountTypesRepository';
import AccountType from '../../infra/typeorm/entities/AccountType';

class AccountTypesRepository implements IAccountTypesRepository {
  private accountTypes: AccountType[] = [];

  public async create({
    user_id,
    name,
  }: ICreateAccountTypeDTO): Promise<AccountType> {
    const accountType = new AccountType();

    Object.assign(accountType, { id: uuid(), user_id, name });

    this.accountTypes.push(accountType);

    return accountType;
  }

  public async update(accountType: AccountType): Promise<AccountType> {
    const findIndex = this.accountTypes.findIndex(
      findAccountType => findAccountType.id === accountType.id,
    );

    this.accountTypes[findIndex] = accountType;

    return accountType;
  }

  public async findByName({
    user_id,
    name,
  }: ICreateAccountTypeDTO): Promise<AccountType | undefined> {
    const findAccountType = this.accountTypes.find(
      accountType =>
        accountType.user_id === user_id && accountType.name === name,
    );

    return findAccountType;
  }

  public async findById(
    user_id: string,
    id: string,
  ): Promise<AccountType | undefined> {
    const findAccountType = this.accountTypes.find(
      accountType => accountType.user_id === user_id && accountType.id === id,
    );

    return findAccountType;
  }

  public async delete(account_type: AccountType): Promise<void> {
    this.accountTypes.filter(accountType => accountType.id !== account_type.id);
  }

  public async findAll(user_id: string): Promise<AccountType[]> {
    const findAccountTypes = this.accountTypes.filter(
      accountType => accountType.user_id === user_id,
    );

    return findAccountTypes;
  }
}

export default AccountTypesRepository;
