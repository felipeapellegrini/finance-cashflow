import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../../../repositories/fakes/FakeCategoriesRepository';
import FakeSubcategoriesRepository from '../../../repositories/fakes/FakeSubcategoriesRepository';
import UpdateSubcategoryService from '../services/UpdateSubcategoryService';
import CreateCategoryService from '../../Category/services/CreateCategoryService';
import CreateSubcategoryService from '../services/CreateSubcategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeSubcategoriesRepository: FakeSubcategoriesRepository;
let updateSubcategory: UpdateSubcategoryService;
let createCategory: CreateCategoryService;
let createSubcategory: CreateSubcategoryService;

describe('UpdateCategories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeSubcategoriesRepository = new FakeSubcategoriesRepository();
    createCategory = new CreateCategoryService(fakeCategoriesRepository);
    createSubcategory = new CreateSubcategoryService(
      fakeSubcategoriesRepository,
      fakeCategoriesRepository,
    );
    updateSubcategory = new UpdateSubcategoryService(
      fakeCategoriesRepository,
      fakeSubcategoriesRepository,
    );
  });
  it('should be able to update a subcategory name', async () => {
    const category = await createCategory.execute({
      name: 'category',
      user_id: 'user',
    });

    const subcategory = await createSubcategory.execute({
      category_name: category.name,
      user_id: 'user',
      subcategory_name: 'subcategory',
    });

    const newSubcategory = await updateSubcategory.execute({
      user_id: 'user',
      id: subcategory.id,
      subcategory_name: 'new subcategory',
      category_name: category.name,
    });

    expect(newSubcategory.name).toBe('new subcategory');
    expect(newSubcategory.id).toEqual(subcategory.id);
  });

  it('should not be able to update a non existing subcategory', async () => {
    const category = await createCategory.execute({
      name: 'category',
      user_id: 'user',
    });

    await expect(
      updateSubcategory.execute({
        user_id: 'user',
        id: 'non existing subcategory',
        subcategory_name: 'new subcategory',
        category_name: category.name,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to link a subcategory with a non existing category', async () => {
    const category = await createCategory.execute({
      name: 'category',
      user_id: 'user',
    });
    const subcategory = await createSubcategory.execute({
      category_name: category.name,
      user_id: 'user',
      subcategory_name: 'subcategory',
    });

    await expect(
      updateSubcategory.execute({
        user_id: 'user',
        id: subcategory.id,
        subcategory_name: 'subcategory',
        category_name: 'non existing category',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a subcategoy name to an existing name', async () => {
    const category = await createCategory.execute({
      name: 'category',
      user_id: 'user',
    });
    const subcategory = await createSubcategory.execute({
      category_name: category.name,
      user_id: 'user',
      subcategory_name: 'subcategory',
    });

    await createSubcategory.execute({
      category_name: category.name,
      user_id: 'user',
      subcategory_name: 'existing subcategory',
    });

    await expect(
      updateSubcategory.execute({
        user_id: 'user',
        id: subcategory.id,
        subcategory_name: 'existing subcategory',
        category_name: category.name,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
