import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IFindAll } from '@modules/accounts/dtos/IAccountDTO';
import IAccountsRepository from '../../../repositories/IAccountsRepository';
import Account from '../../../infra/typeorm/entities/Account';

@injectable()
class ListAccountsService {
  constructor(
    @inject('AccountsRepository')
    private accountsRepository: IAccountsRepository,
  ) {}

  public async execute({ user_id }: IFindAll): Promise<Account[] | undefined> {
    const accounts = await this.accountsRepository.findAll({ user_id });

    if (!accounts || accounts.length === 0) {
      throw new AppError('There is not accounts registered.');
    }

    return accounts;
  }
}

export default ListAccountsService;
