import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICategoriesRepository from '../../../repositories/ICategoriesRepository';
import Category from '../../../infra/typeorm/entities/Category';
import { ICategory } from '../../../dtos/HandleCategoriesDTO';

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ user_id, id, name }: ICategory): Promise<Category> {
    const category = await this.categoriesRepository.findById({
      user_id,
      id,
    });

    if (!category) {
      throw new AppError('This Category does not exist.');
    }

    const checkName = await this.categoriesRepository.findByName({
      user_id,
      name,
    });

    if (checkName && checkName.id !== category.id) {
      throw new AppError('This Category name already exists.');
    }

    if (!name) {
      throw new AppError('New name can not be blank');
    }

    category.name = name;

    await this.categoriesRepository.update(category);

    return category;
  }
}

export default UpdateCategoryService;
