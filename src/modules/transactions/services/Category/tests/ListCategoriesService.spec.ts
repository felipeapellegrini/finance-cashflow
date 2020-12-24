// import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../../../repositories/fakes/FakeCategoriesRepository';
import ListCategoryService from '../services/ListCategoriesService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let listCategories: ListCategoryService;

describe('ListCategories', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listCategories = new ListCategoryService(fakeCategoriesRepository);
  });
  it('should be able to list categories from user', async () => {
    const categoryA = await fakeCategoriesRepository.create({
      user_id: 'user',
      name: 'category A',
    });

    const categoryB = await fakeCategoriesRepository.create({
      user_id: 'user',
      name: 'category B',
    });

    const categories = await listCategories.execute('user');

    expect(categories).toEqual([categoryA, categoryB]);
  });
});
