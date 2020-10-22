import Subcategory from '@modules/transactions/infra/typeorm/entities/Subcategory';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ICategoriesRepository from '@modules/transactions/repositories/ICategoriesRepository';
import ISubcategoriesRepository from '../../repositories/ISubcategoriesRepository';

interface IRequest {
  user_id: string;
  id: string;
  subcategory_name: string;
  category_name: string;
}

@injectable()
export default class UpdateSubcategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,

    @inject('SubcategoriesRepository')
    private subcategoriesRepository: ISubcategoriesRepository,
  ) {}

  public async execute({
    user_id,
    id,
    subcategory_name,
    category_name,
  }: IRequest): Promise<Subcategory> {
    const subcategory = await this.subcategoriesRepository.findById({
      user_id,
      id,
    });

    if (!subcategory) {
      throw new AppError('This subcategory does not exits');
    }

    const category = await this.categoriesRepository.findByName({
      user_id,
      name: category_name,
    });

    if (!category) {
      throw new AppError('This category does not exist');
    }

    const checkNewName = await this.subcategoriesRepository.findByName({
      user_id,
      name: subcategory_name,
      category_id: category.id,
    });

    if (checkNewName) {
      throw new AppError('This name is already in use');
    }

    subcategory.name = subcategory_name;

    await this.subcategoriesRepository.update(subcategory);

    return subcategory;
  }
}
