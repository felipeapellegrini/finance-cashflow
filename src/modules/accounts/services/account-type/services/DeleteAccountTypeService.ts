import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IAccountTypesRepository from '../../../repositories/IAccountTypesRepository';
import { IFindById } from '../../../dtos/IAccountTypeDTO';

@injectable()
class DeleteAccountTypeService {
  constructor(
    @inject('AccountTypesRepository')
    private accountTypesRepository: IAccountTypesRepository,
  ) {}

  public async execute({ user_id, id }: IFindById): Promise<void> {
    const accountType = await this.accountTypesRepository.findById({
      user_id,
      id,
    });

    if (!accountType) {
      throw new AppError('Account Type does not exist');
    }

    await this.accountTypesRepository.delete(accountType);
  }
}

export default DeleteAccountTypeService;
