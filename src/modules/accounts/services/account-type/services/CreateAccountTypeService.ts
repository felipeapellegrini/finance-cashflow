import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IAccountTypesRepository from '../../../repositories/IAccountTypesRepository';
import AccountType from '../../../infra/typeorm/entities/AccountType';
import { ICreateAccountType } from '../../../dtos/IAccountTypeDTO';

@injectable()
class CreateAccountTypeService {
  constructor(
    @inject('AccountTypesRepository')
    private accountTypesRepository: IAccountTypesRepository,
  ) {}

  public async execute({
    name,
    user_id,
  }: ICreateAccountType): Promise<AccountType> {
    const checkAccountTypeExists = await this.accountTypesRepository.findByName(
      {
        user_id,
        name,
      },
    );

    if (checkAccountTypeExists) {
      throw new AppError('Account Type already exists');
    }

    const accountType = await this.accountTypesRepository.create({
      user_id,
      name,
    });

    return accountType;
  }
}

export default CreateAccountTypeService;
