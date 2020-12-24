import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICategoriesRepository from '../../../repositories/ICategoriesRepository';
import Category from '../../../infra/typeorm/entities/Category';

interface IRequest {
  user_id: string;
  category_id: string;
  category_name: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    user_id,
    category_id,
    category_name,
  }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById({
      user_id,
      id: category_id,
    });

    if (!category) {
      throw new AppError('This Category does not exist.');
    }

    const checkName = await this.categoriesRepository.findByName({
      user_id,
      name: category_name,
    });

    if (checkName && checkName.id !== category.id) {
      throw new AppError('This Category name already exists.');
    }

    category.name = category_name;

    await this.categoriesRepository.update(category);

    return category;
  }
}

export default UpdateCategoryService;
