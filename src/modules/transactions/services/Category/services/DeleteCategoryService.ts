import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICategoriesRepository from '../../../repositories/ICategoriesRepository';
import { FindById } from '../../../dtos/HandleCategoriesDTO';

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ user_id, id }: FindById): Promise<void> {
    const category = await this.categoriesRepository.findById({
      user_id,
      id,
    });

    if (!category) {
      throw new AppError('Category does not exist');
    }

    await this.categoriesRepository.delete(category);
  }
}

export default DeleteCategoryService;
