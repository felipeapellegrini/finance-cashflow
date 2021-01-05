import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import AccountType from '../../../infra/typeorm/entities/AccountType';
import IAccountTypesRepository from '../../../repositories/IAccountTypesRepository';
import { IUpdateAccountType } from '../../../dtos/IAccountTypeDTO';

@injectable()
class UpdateAccountTypeService {
  constructor(
    @inject('AccountTypesRepository')
    private accountTypesRepository: IAccountTypesRepository,
  ) {}

  public async execute({
    user_id,
    id,
    new_name,
  }: IUpdateAccountType): Promise<AccountType> {
    const accountType = await this.accountTypesRepository.findById({
      user_id,
      id,
    });

    if (!accountType) {
      throw new AppError('Account Type does not exist');
    }

    const checkName = await this.accountTypesRepository.findByName({
      user_id,
      name: new_name,
    });

    if (checkName && checkName.id !== id) {
      throw new AppError('New Account Type name already exists');
    }

    accountType.name = new_name;

    await this.accountTypesRepository.update(accountType);

    return accountType;
  }
}

export default UpdateAccountTypeService;
