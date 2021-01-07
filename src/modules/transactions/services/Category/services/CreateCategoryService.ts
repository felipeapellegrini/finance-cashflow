import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICategoriesRepository from '../../../repositories/ICategoriesRepository';
import Category from '../../../infra/typeorm/entities/Category';
import { CreateCategory } from '../../../dtos/HandleCategoriesDTO';

@injectable()
export default class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ user_id, name }: CreateCategory): Promise<Category> {
    const checkName = await this.categoriesRepository.findByName({
      user_id,
      name,
    });

    if (checkName) {
      throw new AppError('There is a category with this name already.');
    }

    const category = await this.categoriesRepository.create({ user_id, name });

    return category;
  }
}
