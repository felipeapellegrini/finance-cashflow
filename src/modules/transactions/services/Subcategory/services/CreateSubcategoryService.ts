import ICategoriesRepository from '@modules/transactions/repositories/ICategoriesRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import Subcategory from '../../../infra/typeorm/entities/Subcategory';
import ISubcategoriesRepository from '../../../repositories/ISubcategoriesRepository';

interface IRequest {
  user_id: string;
  category_name: string;
  subcategory_name: string;
}

@injectable()
export default class CreateCategorryService {
  constructor(
    @inject('SubcategoriesRepository')
    private subcategoriesRepository: ISubcategoriesRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    user_id,
    subcategory_name,
    category_name,
  }: IRequest): Promise<Subcategory> {
    const category = await this.categoriesRepository.findByName({
      user_id,
      name: category_name,
    });

    if (!category) {
      throw new AppError(
        'This category does not exist, you must create the category first',
      );
    }
    const checkName = await this.subcategoriesRepository.findByName({
      user_id,
      name: subcategory_name,
      category_id: category.id,
    });

    if (checkName && category.id === checkName.category_id) {
      throw new AppError('This name is already in use.');
    }

    const subcategory = await this.subcategoriesRepository.create({
      user_id,
      category_id: category.id,
      name: subcategory_name,
    });

    return subcategory;
  }
}
