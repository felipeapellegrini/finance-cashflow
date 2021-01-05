import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IAccountsRepository from '../../../repositories/IAccountsRepository';
import Account from '../../../infra/typeorm/entities/Account';
import IAccountTypesRepository from '../../../repositories/IAccountTypesRepository';
import { IUpdateAccount } from '../../../dtos/IAccountDTO';

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
    id,
    user_id,
    account_type,
  }: IUpdateAccount): Promise<Account> {
    const account = await this.accountsRepository.findById({ user_id, id });

    if (!account) {
      throw new AppError('This account does not exist.');
    }

    const checkNewName = await this.accountsRepository.findByName({
      user_id,
      name,
    });

    if (checkNewName && checkNewName.id !== id) {
      throw new AppError(
        'There is an account with this name already, please type another one.',
      );
    }

    const accountType = await this.accountTypesRepository.findByName({
      user_id,
      name: account_type,
    });

    if (!accountType) {
      throw new AppError(
        'New account type is invalid, please choose a valid one.',
      );
    }

    account.name = name;
    account.type = accountType.id;

    await this.accountsRepository.update(account);

    return account;
  }
}

export default CreateAccountService;
