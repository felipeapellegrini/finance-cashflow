import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../../../repositories/fakes/FakeCategoriesRepository';
import FakeSubcategoriesRepository from '../../../repositories/fakes/FakeSubcategoriesRepository';
import CreateSubcategoryService from '../services/CreateSubcategoryService';
import CreateCategoryService from '../../Category/services/CreateCategoryService';

let fakeCateoriesRepository: FakeCategoriesRepository;
let fakeSubcategoriesRepository: FakeSubcategoriesRepository;
let createSubcategory: CreateSubcategoryService;
let createCategory: CreateCategoryService;

describe('CreateCategory', () => {
  beforeEach(() => {
    fakeCateoriesRepository = new FakeCategoriesRepository();
    fakeSubcategoriesRepository = new FakeSubcategoriesRepository();
    createSubcategory = new CreateSubcategoryService(
      fakeSubcategoriesRepository,
      fakeCateoriesRepository,
    );
    createCategory = new CreateCategoryService(fakeCateoriesRepository);
  });
  it('should be able to create a subcategory', async () => {
    const category = await createCategory.execute({
      name: 'category',
      user_id: 'user',
    });
    const subcategory = await createSubcategory.execute({
      user_id: 'user',
      category_name: 'category',
      subcategory_name: 'subcategory',
    });

    expect(subcategory).toHaveProperty('id');
    expect(subcategory.category_id).toBe(category.id);
  });

  it('should not be able to create two subcategories with the same name for the same category', async () => {
    const category = await createCategory.execute({
      name: 'category',
      user_id: 'user',
    });
    const subcategory = await createSubcategory.execute({
      user_id: 'user',
      category_name: category.name,
      subcategory_name: 'subcategory',
    });

    await expect(
      createSubcategory.execute({
        user_id: 'user',
        category_name: category.name,
        subcategory_name: subcategory.name,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a subcategory from a non existing categroy', async () => {
    await expect(
      createSubcategory.execute({
        user_id: 'user',
        category_name: 'non existing category',
        subcategory_name: 'subcategory',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
