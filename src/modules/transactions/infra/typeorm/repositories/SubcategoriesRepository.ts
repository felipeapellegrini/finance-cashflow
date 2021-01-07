import { Repository, getRepository } from 'typeorm';
import ISubcategoriesRepository from '../../../repositories/ISubcategoriesRepository';
import Subcategory from '../entities/Subcategory';
import {
  ICreateSubcategoryDTO,
  IFindByIdDTO,
  IFindByNameDTO,
  FindAll,
} from '../../../dtos/HandleSubcategoriesDTO';

export default class SubcategoriesRepository
  implements ISubcategoriesRepository {
  private ormRepository: Repository<Subcategory>;

  constructor() {
    this.ormRepository = getRepository(Subcategory);
  }

  public async create({
    name,
    user_id,
    category_id,
  }: ICreateSubcategoryDTO): Promise<Subcategory> {
    const subcatergory = this.ormRepository.create({
      name,
      user_id,
      category_id,
    });

    await this.ormRepository.save(subcatergory);

    return subcatergory;
  }

  public async update(subcategory: Subcategory): Promise<Subcategory> {
    return this.ormRepository.save(subcategory);
  }

  public async findByName({
    name,
    user_id,
  }: IFindByNameDTO): Promise<Subcategory | undefined> {
    const subcategory = await this.ormRepository.findOne({
      where: {
        user_id,
        name,
      },
    });

    return subcategory;
  }

  public async findById({
    id,
    user_id,
  }: IFindByIdDTO): Promise<Subcategory | undefined> {
    const subcatergory = await this.ormRepository.findOne({
      where: {
        user_id,
        id,
      },
    });

    return subcatergory;
  }

  public async findAll({ user_id }: FindAll): Promise<Subcategory[]> {
    const subcategory = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return subcategory;
  }

  public async delete(subcategory: Subcategory): Promise<void> {
    await this.ormRepository.remove(subcategory);
  }
}
