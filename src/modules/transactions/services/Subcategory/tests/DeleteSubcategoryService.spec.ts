import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../../../repositories/fakes/FakeCategoriesRepository';
import FakeSubcategoriesRepository from '../../../repositories/fakes/FakeSubcategoriesRepository';
import CreateSubcategoryService from '../services/CreateSubcategoryService';
import CreateCategorryService from '../../Category/services/CreateCategoryService';
import DeleteSubcategoryService from '../services/DeleteSubcategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let fakeSubcategoriesRepository: FakeSubcategoriesRepository;
let createSubcategory: CreateSubcategoryService;
let createCategory: CreateCategorryService;
let deleteSubcategory: DeleteSubcategoryService;

describe('CreateCategory', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    fakeSubcategoriesRepository = new FakeSubcategoriesRepository();
    createSubcategory = new CreateSubcategoryService(
      fakeSubcategoriesRepository,
      fakeCategoriesRepository,
    );
    createCategory = new CreateCategorryService(fakeCategoriesRepository);
    deleteSubcategory = new DeleteSubcategoryService(
      fakeSubcategoriesRepository,
    );
  });

  it('should be able to delete a subcategory', async () => {
    await createCategory.execute({
      user_id: 'user',
      name: 'category',
    });

    const subcategory = await createSubcategory.execute({
      user_id: 'user',
      subcategory_name: 'subcategory',
      category_name: 'category',
    });

    await deleteSubcategory.execute({
      user_id: 'user',
      id: subcategory.id,
    });

    const subcategories = await fakeSubcategoriesRepository.findById({
      user_id: 'user',
      id: subcategory.id,
    });

    expect(subcategories).toBeUndefined();
  });

  it('should not be able to delete a non existing subcategory', async () => {
    await expect(
      deleteSubcategory.execute({
        user_id: 'user',
        id: 'non existing id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
