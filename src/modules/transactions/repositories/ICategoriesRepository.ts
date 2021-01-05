import Category from '../infra/typeorm/entities/Category';
import { ICategory } from '../dtos/HandleCategoriesDTO';

export default interface ICategoriesRepository {
  create({ name, user_id }: ICategory): Promise<Category>;
  update(category: Category): Promise<Category>;
  findByName({ user_id, name }: ICategory): Promise<Category | undefined>;
  findById({ user_id, id }: ICategory): Promise<Category | undefined>;
  findAll({ user_id }: ICategory): Promise<Category[] | undefined>;
  delete(category: Category): Promise<void>;
}
