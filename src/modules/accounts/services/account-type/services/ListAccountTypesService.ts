import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IAccountTypesRepository from '../../../repositories/IAccountTypesRepository';
import AccountType from '../../../infra/typeorm/entities/AccountType';
import { IFindAll } from '../../../dtos/IAccountTypeDTO';

@injectable()
class ListAccountTypesService {
  constructor(
    @inject('AccountTypesRepository')
    private accountTypesRepository: IAccountTypesRepository,
  ) {}

  public async execute({
    user_id,
  }: IFindAll): Promise<AccountType[] | undefined> {
    const accountTypes = await this.accountTypesRepository.findAll({ user_id });

    if (!accountTypes || accountTypes.length === 0) {
      throw new AppError('There is not account types registered.');
    }

    return accountTypes;
  }
}

export default ListAccountTypesService;
