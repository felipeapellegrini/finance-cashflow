import Subcategory from '../infra/typeorm/entities/Subcategory';
import {
  ICreateSubcategoryDTO,
  IFindByNameDTO,
  IFindByIdDTO,
  FindAll,
} from '../dtos/HandleSubcategoriesDTO';

export default interface ISubcategoriesRepository {
  create(data: ICreateSubcategoryDTO): Promise<Subcategory>;
  update(subcategory: Subcategory): Promise<Subcategory>;
  findByName(data: IFindByNameDTO): Promise<Subcategory | undefined>;
  findById(data: IFindByIdDTO): Promise<Subcategory | undefined>;
  findAll({ user_id }: FindAll): Promise<Subcategory[] | undefined>;
  delete(subcategory: Subcategory): Promise<void>;
}
