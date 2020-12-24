import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../../../repositories/fakes/FakeCategoriesRepository';
import DeleteCategoryService from '../services/DeleteCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let deleteCategory: DeleteCategoryService;

describe('DeleteCategory', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    deleteCategory = new DeleteCategoryService(fakeCategoriesRepository);
  });
  it('should be able to delete a category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'category',
      user_id: 'user',
    });

    await deleteCategory.execute({
      user_id: 'user',
      id: category.id,
    });

    const categories = await fakeCategoriesRepository.findById({
      user_id: 'user',
      id: category.id,
    });

    expect(categories).toBeUndefined();
  });

  it('should not be able to delete a non existing category', async () => {
    await expect(
      deleteCategory.execute({
        user_id: 'user',
        id: 'non existing category',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
