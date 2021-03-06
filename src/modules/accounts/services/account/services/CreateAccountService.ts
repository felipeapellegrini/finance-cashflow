import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IAccountsRepository from '../../../repositories/IAccountsRepository';
import Account from '../../../infra/typeorm/entities/Account';
import IAccountTypesRepository from '../../../repositories/IAccountTypesRepository';
import { ICreateAccount } from '../../../dtos/IAccountDTO';

@injectable()
class CreateAccountService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,

    @inject('AccountTypesRepository')
    private accountTypesRepository: IAccountTypesRepository,
  ) {}

  public async execute({
    name,
    user_id,
    account_type,
  }: ICreateAccount): Promise<Account> {
    const checkAccountName = await this.accountsRepository.findByName({
      name,
      user_id,
    });

    if (checkAccountName) {
      throw new AppError('This account name is already registered');
    }

    const accountType = await this.accountTypesRepository.findByName({
      user_id,
      name: account_type,
    });

    if (!accountType) {
      throw new AppError('Account Type is invalid, please choose a valid one.');
    }

    const account = await this.accountsRepository.create({
      name,
      user_id,
      account_type: accountType.id,
    });

    return account;
  }
}

export default CreateAccountService;
