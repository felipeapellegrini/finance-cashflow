import { injectable, inject } from 'tsyringe';
import Subcategory from '@modules/transactions/infra/typeorm/entities/Subcategory';
import AppError from '@shared/errors/AppError';
import ISubcategoriesRepository from '../../repositories/ISubcategoriesRepository';

@injectable()
export default class ListSubcategoriesService {
  constructor(
    @inject('SubcategoriesRepository')
    private subcategoriesRepository: ISubcategoriesRepository,
  ) {}

  public async execute(user_id: string): Promise<Subcategory[] | undefined> {
    const subcategories = await this.subcategoriesRepository.findAll(user_id);

    if (subcategories?.length === 0) {
      throw new AppError('There is no subcategories yes, please register one');
    }

    return subcategories;
  }
}
