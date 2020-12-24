// import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../../../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from '../services/CreateCategoryService';

let fakeCateoriesRepository: FakeCategoriesRepository;
let createCategory: CreateCategoryService;

describe('CreateCategory', () => {
  beforeEach(() => {
    fakeCateoriesRepository = new FakeCategoriesRepository();
    createCategory = new CreateCategoryService(fakeCateoriesRepository);
  });
  it('should be able to create a category', async () => {
    const category = await createCategory.execute({
      user_id: 'user',
      name: 'category',
    });

    expect(category).toHaveProperty('id');
  });
});
