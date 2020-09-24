import AccountType from '@modules/accounts/infra/typeorm/entities/AccountType';

export default interface ICreateAccountDTO {
  name: string;
  type: AccountType;
}
