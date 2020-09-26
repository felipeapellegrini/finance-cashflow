import AccountType from '../infra/typeorm/entities/AccountType';

export default interface IAccountTypesRepository {
  create(name: string): Promise<AccountType>;
  update(account_type: AccountType): Promise<AccountType>;
  findByName(name: string): Promise<AccountType | undefined>;
  delete(account_type: AccountType): Promise<void>;
  findById(id: string): Promise<AccountType | undefined>;
}
