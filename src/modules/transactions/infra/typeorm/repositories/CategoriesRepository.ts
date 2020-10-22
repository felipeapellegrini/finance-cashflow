import HandleCategoriesDTO from '@modules/transactions/dtos/HandleCategoriesDTO';
import IFindByIdDTO from '@modules/transactions/dtos/IFindByIdDTO';
import { Repository, getRepository } from 'typeorm';
import ICategoriesRepository from '../../../repositories/ICategoriesRepository';
import Category from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create({
    name,
    user_id,
  }: HandleCategoriesDTO): Promise<Category> {
    const category = this.ormRepository.create({
      name,
      user_id,
    });

    await this.ormRepository.save(category);

    return category;
  }

  public async update(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }

  public async findByName({
    user_id,
    name,
  }: HandleCategoriesDTO): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: {
        user_id,
        name,
      },
    });

    return category;
  }

  public async findById({
    user_id,
    id,
  }: IFindByIdDTO): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: {
        user_id,
        id,
      },
    });

    return category;
  }

  public async findAll(user_id: string): Promise<Category[]> {
    const category = await this.ormRepository.find({
      where: {
        user_id,
      },
    });

    return category;
  }

  public async delete(category: Category): Promise<void> {
    await this.ormRepository.remove(category);
  }
}

export default CategoriesRepository;
