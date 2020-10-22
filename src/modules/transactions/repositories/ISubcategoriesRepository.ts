import Subcategory from '../infra/typeorm/entities/Subcategory';
import {
  ICreateSubcategoryDTO,
  IFindByNameDTO,
  IFindByIdDTO,
} from '../dtos/SubcategoriesDTOS';

export default interface ISubcategoriesRepository {
  create(data: ICreateSubcategoryDTO): Promise<Subcategory>;
  update(subcategory: Subcategory): Promise<Subcategory>;
  findByName(data: IFindByNameDTO): Promise<Subcategory | undefined>;
  findById(data: IFindByIdDTO): Promise<Subcategory | undefined>;
  findAll(user_id: string): Promise<Subcategory[] | undefined>;
  delete(subcategory: Subcategory): Promise<void>;
}
