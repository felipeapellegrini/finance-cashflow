import { v4 } from 'uuid';

import Subcategory from '@modules/transactions/infra/typeorm/entities/Subcategory';
import ISubcategoriesRepository from '../ISubcategoriesRepository';
import {
  ICreateSubcategoryDTO,
  IFindByIdDTO,
  IFindByNameDTO,
} from '../../dtos/SubcategoriesDTOS';

export default class SubcategoriesRepository
  implements ISubcategoriesRepository {
  private subcategories: Subcategory[] = [];

  public async create({
    name,
    user_id,
    category_id,
  }: ICreateSubcategoryDTO): Promise<Subcategory> {
    const subcategory = new Subcategory();

    Object.assign(subcategory, { id: v4(), name, user_id, category_id });

    this.subcategories.push(subcategory);

    return subcategory;
  }

  public async update(subcategory: Subcategory): Promise<Subcategory> {
    const findIndex = this.subcategories.findIndex(
      findSubcategory =>
        findSubcategory.id === subcategory.id &&
        findSubcategory.user_id === subcategory.user_id,
    );

    this.subcategories[findIndex] = subcategory;

    return subcategory;
  }

  public async findByName({
    name,
    user_id,
  }: IFindByNameDTO): Promise<Subcategory | undefined> {
    const subcategory = this.subcategories.find(
      findSubcategory =>
        findSubcategory.name === name && findSubcategory.user_id === user_id,
    );

    return subcategory;
  }

  public async findById({
    id,
    user_id,
  }: IFindByIdDTO): Promise<Subcategory | undefined> {
    const subcatergory = this.subcategories.find(
      findSubcategory =>
        findSubcategory.id === id && findSubcategory.user_id === user_id,
    );

    return subcatergory;
  }

  public async findAll(user_id: string): Promise<Subcategory[]> {
    const subcategory = this.subcategories.filter(
      findSubcategory => findSubcategory.user_id === user_id,
    );

    return subcategory;
  }

  public async delete(subcategory: Subcategory): Promise<void> {
    this.subcategories.filter(
      keepSubcategories =>
        keepSubcategories.id !== subcategory.id &&
        keepSubcategories.user_id === subcategory.user_id,
    );
  }
}
