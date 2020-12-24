import { v4 } from 'uuid';

import HandleCategoriesDTO from '@modules/transactions/dtos/HandleCategoriesDTO';
import IFindByIdDTO from '@modules/transactions/dtos/IFindByIdDTO';
import ICategoriesRepository from '../ICategoriesRepository';
import Category from '../../infra/typeorm/entities/Category';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  public async create({
    name,
    user_id,
  }: HandleCategoriesDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, { id: v4(), name, user_id });

    this.categories.push(category);

    return category;
  }

  public async update(category: Category): Promise<Category> {
    const findIndex = this.categories.findIndex(
      findCategory => findCategory.id === category.id,
    );

    this.categories[findIndex] = category;

    return category;
  }

  public async findByName({
    user_id,
    name,
  }: HandleCategoriesDTO): Promise<Category | undefined> {
    const findCategory = this.categories.find(
      category => category.name === name && category.user_id === user_id,
    );

    return findCategory;
  }

  public async findById({
    user_id,
    id,
  }: IFindByIdDTO): Promise<Category | undefined> {
    const findCategory = this.categories.find(
      category => category.id === id && category.user_id === user_id,
    );

    return findCategory;
  }

  public async findAll(user_id: string): Promise<Category[]> {
    const findCategory = this.categories.filter(
      category => category.user_id === user_id,
    );

    return findCategory;
  }

  public async delete(category: Category): Promise<void> {
    this.categories = this.categories.filter(
      keepCategory => keepCategory.id !== category.id,
    );
  }
}

export default FakeCategoriesRepository;
