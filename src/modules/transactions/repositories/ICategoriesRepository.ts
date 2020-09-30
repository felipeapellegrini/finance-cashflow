import Category from '../infra/typeorm/entities/Category';
import HandleCategoriesDTO from '../dtos/HandleCategoriesDTO';
import IFindByIdDTO from '../dtos/IFindByIdDTO';

export default interface ICategoriesRepository {
  create(data: HandleCategoriesDTO): Promise<Category>;
  update(category: Category): Promise<Category>;
  findByName(data: HandleCategoriesDTO): Promise<Category | undefined>;
  findById({ user_id, id }: IFindByIdDTO): Promise<Category | undefined>;
  findAll(user_id: string): Promise<Category[] | undefined>;
  delete(cost_center: Category): Promise<void>;
}
