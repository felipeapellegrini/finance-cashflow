import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../../../repositories/fakes/FakeCategoriesRepository';
import UpdateCategoryService from '../services/UpdateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let updateCategories: UpdateCategoryService;

describe('UpdateCategories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    updateCategories = new UpdateCategoryService(fakeCategoriesRepository);
  });
  it('should be able to update a category name', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'category',
      user_id: 'user',
    });

    const newCategory = await updateCategories.execute({
      user_id: 'user',
      category_id: category.id,
      category_name: 'new category',
    });

    expect(newCategory.name).toBe('new category');
    expect(newCategory.id).toEqual(category.id);
  });

  it('should not be able to update a non existing category', async () => {
    expect(
      updateCategories.execute({
        user_id: 'user',
        category_name: 'new category',
        category_id: 'non existing id',
      }),
    );
  });

  it('should not be able to update a category name to a existing name', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'category',
      user_id: 'user',
    });

    await fakeCategoriesRepository.create({
      name: 'another category',
      user_id: 'user',
    });

    await expect(
      updateCategories.execute({
        user_id: 'user',
        category_id: category.id,
        category_name: 'another category',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
