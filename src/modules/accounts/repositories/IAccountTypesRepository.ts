import AccountType from '../infra/typeorm/entities/AccountType';

export default interface IAccountTypesRepository {
  create(name: string): Promise<AccountType>;
  update(account_type: AccountType): Promise<AccountType>;
}
