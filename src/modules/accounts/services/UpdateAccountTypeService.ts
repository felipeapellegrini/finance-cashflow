import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import AccountType from '../infra/typeorm/entities/AccountType';
import IAccountTypesRepository from '../repositories/IAccountTypesRepository';

interface IRequest {
  id: string;
  new_name: string;
}

@injectable()
class UpdateAccountTypeService {
  constructor(
    @inject('AccountTypesRepository')
    private accountTypesRepository: IAccountTypesRepository,
  ) {}

  public async execute({ id, new_name }: IRequest): Promise<AccountType> {
    const accountType = await this.accountTypesRepository.findById(id);

    if (!accountType) {
      throw new AppError('Account Type does not exist');
    }

    const checkName = await this.accountTypesRepository.findByName(new_name);

    if (checkName && checkName.id !== id) {
      throw new AppError('New Account Type name already exists');
    }

    accountType.name = new_name;

    await this.accountTypesRepository.update(accountType);

    return accountType;
  }
}

export default UpdateAccountTypeService;
