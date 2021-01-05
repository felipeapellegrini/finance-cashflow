import AppError from '@shared/errors/AppError';
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
      account_type: accountType.name,
    });

    const updatedAccount = await updateAccount.execute({
      name: 'account-B',
      id: account.id,
      user_id: 'user',
      account_type: accountType.name,
    });

    expect(updatedAccount.name).toBe('account-B');
  });

  test('should not be able to update an account that does not exist', async () => {
    await fakeAccountTypesRepository.create({
      user_id: 'user',
      name: 'account-type',
    });

    await expect(
      updateAccount.execute({
        name: 'invalid-account',
        id: 'invalid-id',
        user_id: 'user',
        account_type: 'account-type',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  test('should throw when the new account name already exists', async () => {
    await fakeAccountTypesRepository.create({
      user_id: 'user',
      name: 'account-type',
    });

    await fakeAccountsRepository.create({
      name: 'account-A',
      user_id: 'user',
      account_type: 'account-type',
    });

    const accountB = await fakeAccountsRepository.create({
      name: 'account-B',
      user_id: 'user',
      account_type: 'account-type',
    });

    await expect(
      updateAccount.execute({
        name: 'account-A',
        id: accountB.id,
        user_id: 'user',
        account_type: 'account-type',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  test('should throw when the new account type is invalid', async () => {
    await fakeAccountTypesRepository.create({
      user_id: 'user',
      name: 'account-type',
    });

    const account = await fakeAccountsRepository.create({
      name: 'account',
      user_id: 'user',
      account_type: 'account-type',
    });

    await expect(
      updateAccount.execute({
        name: account.name,
        id: account.id,
        user_id: account.user_id,
        account_type: 'invalid-account-type',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an account from another user', async () => {
    await fakeAccountTypesRepository.create({
      user_id: 'user',
      name: 'account-type',
    });

    const account = await fakeAccountsRepository.create({
      name: 'account',
      account_type: 'account-type',
      user_id: 'user',
    });

    await expect(
      updateAccount.execute({
        name: 'new account',
        id: account.id,
        user_id: 'user-2',
        account_type: 'account-type',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
