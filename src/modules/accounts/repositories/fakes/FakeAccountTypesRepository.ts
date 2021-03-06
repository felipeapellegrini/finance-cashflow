import { v4 } from 'uuid';
import {
  ICreateAccountType,
  IFindAll,
  IFindById,
} from '../../dtos/IAccountTypeDTO';
import IAccountTypesRepository from '../IAccountTypesRepository';
import AccountType from '../../infra/typeorm/entities/AccountType';

class AccountTypesRepository implements IAccountTypesRepository {
  private accountTypes: AccountType[] = [];

  public async create({
    user_id,
    name,
  }: ICreateAccountType): Promise<AccountType> {
    const accountType = new AccountType();

    Object.assign(accountType, { id: v4(), user_id, name });

    this.accountTypes.push(accountType);

    return accountType;
  }

  public async update(accountType: AccountType): Promise<AccountType> {
    const findIndex = this.accountTypes.findIndex(
      findAccountType =>
        findAccountType.id === accountType.id &&
        findAccountType.user_id === accountType.user_id,
    );

    this.accountTypes[findIndex] = accountType;

    return accountType;
  }

  public async findByName({
    user_id,
    name,
  }: ICreateAccountType): Promise<AccountType | undefined> {
    const findAccountType = this.accountTypes.find(
      accountType =>
        accountType.user_id === user_id && accountType.name === name,
    );

    return findAccountType;
  }

  public async findById({
    user_id,
    id,
  }: IFindById): Promise<AccountType | undefined> {
    const findAccountType = this.accountTypes.find(
      accountType => accountType.user_id === user_id && accountType.id === id,
    );

    return findAccountType;
  }

  public async delete(account_type: AccountType): Promise<void> {
    this.accountTypes = this.accountTypes.filter(
      accountType =>
        accountType.id !== account_type.id &&
        accountType.user_id === account_type.user_id,
    );
  }

  public async findAll({ user_id }: IFindAll): Promise<AccountType[]> {
    const findAccountTypes = this.accountTypes.filter(
      accountType => accountType.user_id === user_id,
    );

    return findAccountTypes;
  }
}

export default AccountTypesRepository;
