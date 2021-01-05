import AppError from '@shared/errors/AppError';
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
    const accountType = await fakeAccountTypesRepository.create({
      user_id: 'user',
      name: 'account type',
    });

    const accountTypes = await listAccountType.execute({ user_id: 'user' });

    expect(accountTypes).toEqual([accountType]);
  });

  it('should not be able to list account types when they do not exist', async () => {
    await expect(
      listAccountType.execute({ user_id: 'user' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
