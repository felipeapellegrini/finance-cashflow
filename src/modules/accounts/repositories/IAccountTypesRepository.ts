import {
  ICreateAccountType,
  IFindById,
  IFindAll,
} from '../dtos/IAccountTypeDTO';
import AccountType from '../infra/typeorm/entities/AccountType';

export default interface IAccountTypesRepository {
  create(data: ICreateAccountType): Promise<AccountType>;
  update(account_type: AccountType): Promise<AccountType>;
  findByName(data: ICreateAccountType): Promise<AccountType | undefined>;
  delete(account_type: AccountType): Promise<void>;
  findById(data: IFindById): Promise<AccountType | undefined>;
  findAll(data: IFindAll): Promise<AccountType[] | undefined>;
}
