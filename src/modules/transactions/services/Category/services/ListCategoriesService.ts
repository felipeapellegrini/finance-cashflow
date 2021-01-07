import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import ICategoriesRepository from '../../../repositories/ICategoriesRepository';
import Category from '../../../infra/typeorm/entities/Category';
import { FindAll } from '../../../dtos/HandleCategoriesDTO';

@injectable()
class ListCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ user_id }: FindAll): Promise<Category[] | undefined> {
    const categories = await this.categoriesRepository.findAll({ user_id });

    if (!categories || categories.length === 0) {
      throw new AppError(
        'There is no categories registered, please register one.',
      );
    }

    return categories;
  }
}

export default ListCategoriesService;
