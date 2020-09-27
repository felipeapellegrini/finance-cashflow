import ICreateAccountTypeDTO from '../dtos/ICreateAccountTypeDTO';
import AccountType from '../infra/typeorm/entities/AccountType';

export default interface IAccountTypesRepository {
  create(data: ICreateAccountTypeDTO): Promise<AccountType>;
  update(account_type: AccountType): Promise<AccountType>;
  findByName(data: ICreateAccountTypeDTO): Promise<AccountType | undefined>;
  delete(account_type: AccountType): Promise<void>;
  findById(user_id: string, id: string): Promise<AccountType | undefined>;
  findAll(user_id: string): Promise<AccountType[] | undefined>;
}
