import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IAccountTypesRepository from '../repositories/IAccountTypesRepository';
import AccountType from '../infra/typeorm/entities/AccountType';

@injectable()
class CreateAccountTypeService {
  constructor(
    @inject('AccountTypesRepository')
    private accountTypesRepository: IAccountTypesRepository,
  ) {}

  public async execute(name: string): Promise<AccountType> {
    const checkAccountTypeExists = await this.accountTypesRepository.findByName(
      name,
    );

    if (checkAccountTypeExists) {
      throw new AppError('Account Type already exists');
    }

    const accountType = await this.accountTypesRepository.create(name);

    return accountType;
  }
}

export default CreateAccountTypeService;
