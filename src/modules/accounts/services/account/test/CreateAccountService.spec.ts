import AppError from '@shared/errors/AppError';
import FakeAccountsRepository from '../../../repositories/fakes/FakeAccountsRepository';
import FakeAccountTypesRepository from '../../../repositories/fakes/FakeAccountTypesRepository';
import CreateAccountService from '../services/CreateAccountService';

let fakeAccountsRepository: FakeAccountsRepository;
let fakeAccountTypesRepository: FakeAccountTypesRepository;
let createAccount: CreateAccountService;

describe('CreateAccount', () => {
  beforeEach(() => {
    fakeAccountsRepository = new FakeAccountsRepository();
    fakeAccountTypesRepository = new FakeAccountTypesRepository();
    createAccount = new CreateAccountService(
      fakeAccountsRepository,
      fakeAccountTypesRepository,
    );
  });

  it('should be able to create a new account', async () => {
    await fakeAccountTypesRepository.create({
      user_id: '123123',
      name: 'accountType-test',
    });

    const account = await createAccount.execute({
      name: 'account-test',
      user_id: '123123',
      account_type: 'accountType-test',
    });

    expect(account).toHaveProperty('id');
    expect(account.name).toBe('account-test');
    expect(account.user_id).toBe('123123');
  });

  it('should not be able to create two accounts with the same name to the same user', async () => {
    const user1 = '123123';

    await fakeAccountTypesRepository.create({
      user_id: user1,
      name: 'account-type',
    });

    await createAccount.execute({
      name: 'account-1',
      user_id: user1,
      account_type: 'account-type',
    });

    await expect(
      createAccount.execute({
        name: 'account-1',
        user_id: user1,
        account_type: 'account-type',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create accounts with the same name for different users', async () => {
    // create one account-type for each fake user
    await fakeAccountTypesRepository.create({
      user_id: 'user-1',
      name: 'account-type',
    });

    await fakeAccountTypesRepository.create({
      user_id: 'user-2',
      name: 'account-type',
    });

    // create one fake account for the first fake user
    await createAccount.execute({
      name: 'account',
      user_id: 'user-1',
      account_type: 'account-type',
    });

    // expect that other user can create an account with the same name of the first user
    await expect(
      createAccount.execute({
        name: 'account',
        user_id: 'user-2',
        account_type: 'account-type',
      }),
    ).resolves.toHaveProperty('id');
  });

  it('should not be able to create an account with an invalid account-type', async () => {
    await expect(
      createAccount.execute({
        name: 'account',
        user_id: 'user-1',
        account_type: 'invalid-account-type',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
