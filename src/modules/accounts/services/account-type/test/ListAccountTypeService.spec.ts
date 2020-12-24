// import AppError from '@shared/errors/AppError';
import FakeAccountTypesRepository from '../../../repositories/fakes/FakeAccountTypesRepository';
import ListAccountTypesService from '../services/ListAccountTypesService';

let fakeAccountTypesRepository: FakeAccountTypesRepository;
let listAccountType: ListAccountTypesService;

describe('ListAccountType', () => {
  beforeEach(() => {
    fakeAccountTypesRepository = new FakeAccountTypesRepository();
    listAccountType = new ListAccountTypesService(fakeAccountTypesRepository);
  });
  it('should be able to list all account types', async () => {
    await fakeAccountTypesRepository.create({
      user_id: 'user',
      name: 'account type',
    });

    const accountTypes = await listAccountType.execute('user');

    expect(accountTypes).toHaveProperty('length');
    expect(accountTypes?.length).toBeGreaterThan(0);
  });
});
