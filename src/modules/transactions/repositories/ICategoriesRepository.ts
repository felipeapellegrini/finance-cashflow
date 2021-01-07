import Category from '../infra/typeorm/entities/Category';
import { CreateCategory, FindById, FindAll } from '../dtos/HandleCategoriesDTO';

export default interface ICategoriesRepository {
  create({ name, user_id }: CreateCategory): Promise<Category>;
  update(category: Category): Promise<Category>;
  findByName({ user_id, name }: CreateCategory): Promise<Category | undefined>;
  findById({ user_id, id }: FindById): Promise<Category | undefined>;
  findAll({ user_id }: FindAll): Promise<Category[] | undefined>;
  delete(category: Category): Promise<void>;
}
