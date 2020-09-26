import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IAccountTypesRepository from '../repositories/IAccountTypesRepository';

@injectable()
class DeleteAccountTypeService {
  constructor(
    @inject('AccountTypesRepository')
    private accountTypesRepository: IAccountTypesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const getAccountType = await this.accountTypesRepository.findById(id);

    if (!getAccountType) {
      throw new AppError('Account Type does not exists');
    }

    await this.accountTypesRepository.delete(getAccountType);
  }
}

export default DeleteAccountTypeService;
