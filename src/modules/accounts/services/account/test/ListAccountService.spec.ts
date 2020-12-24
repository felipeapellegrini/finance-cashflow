import AppError from '@shared/errors/AppError';
import FakeAccountsRepository from '../../../repositories/fakes/FakeAccountsRepository';
import ListAccountService from '../services/ListAccountsService';
import FakeAccountTypesRepository from '../../../repositories/fakes/FakeAccountTypesRepository';

let fakeAccountsRepository: FakeAccountsRepository;
let fakeAccountTypesRepository: FakeAccountTypesRepository;
let listAccount: ListAccountService;

describe('ListAccount', () => {
  beforeEach(() => {
    fakeAccountsRepository = new FakeAccountsRepository();
    fakeAccountTypesRepository = new FakeAccountTypesRepository();
    listAccount = new ListAccountService(fakeAccountsRepository);
  });

  it('should be able to list the accounts from a user', async () => {
    await fakeAccountTypesRepository.create({
      user_id: 'user',
      name: 'account-type',
    });

    const account = await fakeAccountsRepository.create({
      name: 'account',
      user_id: 'user',
      type: 'account-type',
    });

    const account2 = await fakeAccountsRepository.create({
      name: 'account-2',
      user_id: 'user',
      type: 'account-type',
    });

    const accounts = await listAccount.execute('user');

    expect(accounts).toEqual([account, account2]);
  });

  it('should throw if user has no accounts registered', async () => {
    await expect(listAccount.execute('user')).rejects.toBeInstanceOf(AppError);
  });
});
