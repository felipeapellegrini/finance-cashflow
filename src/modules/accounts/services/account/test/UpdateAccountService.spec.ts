// import AppError from '@shared/errors/AppError';
import FakeAccountsRepository from '../../../repositories/fakes/FakeAccountsRepository';
import FakeAccountTypesRepository from '../../../repositories/fakes/FakeAccountTypesRepository';
import UpdateAccountService from '../services/UpdateAccountService';

let fakeAccountsRepository: FakeAccountsRepository;
let fakeAccountTypesRepository: FakeAccountTypesRepository;
let updateAccount: UpdateAccountService;

describe('UpdateAccount', () => {
  beforeEach(() => {
    fakeAccountsRepository = new FakeAccountsRepository();
    fakeAccountTypesRepository = new FakeAccountTypesRepository();
    updateAccount = new UpdateAccountService(
      fakeAccountsRepository,
      fakeAccountTypesRepository,
    );
  });

  it('should be able to update an account', async () => {
    const accountType = await fakeAccountTypesRepository.create({
      user_id: 'user',
      name: 'account-type',
    });

    const account = await fakeAccountsRepository.create({
      name: 'account-A',
      user_id: 'user',
      type: accountType.name,
    });

    const updatedAccount = await updateAccount.execute({
      name: 'account-B',
      id: account.id,
      user_id: 'user',
      type_name: accountType.name,
    });

    expect(updatedAccount.name).toBe('account-B');
  });
});
