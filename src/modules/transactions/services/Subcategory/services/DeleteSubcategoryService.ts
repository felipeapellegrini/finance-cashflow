import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ISubcategoriesRepository from '../../../repositories/ISubcategoriesRepository';

interface IRequest {
  user_id: string;
  id: string;
}

@injectable()
export default class DeleteSubcategoryService {
  constructor(
    @inject('SubcategoriesRepository')
    private subcategoriesRepository: ISubcategoriesRepository,
  ) {}

  public async execute({ user_id, id }: IRequest): Promise<void> {
    const subcategory = await this.subcategoriesRepository.findById({
      user_id,
      id,
    });

    if (!subcategory) {
      throw new AppError('Subcategory does not exist');
    }

    await this.subcategoriesRepository.delete(subcategory);
  }
}
