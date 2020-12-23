import FakeAccountsRepository from '../../repositories/fakes/FakeAccountsRepository';
import FakeAccountTypesRepository from '../../repositories/fakes/FakeAccountTypesRepository';
import CreateAccountService from '../CreateAccountService';

describe('CreateAccount', () => {
  const fakeAccountsRepository = new FakeAccountsRepository();
  const fakeAccountTypesRepository = new FakeAccountTypesRepository();
  it('should be able to create a new account', async () => {
    const createAccount = new CreateAccountService(
      fakeAccountsRepository,
      fakeAccountTypesRepository,
    );

    const account = await createAccount.execute({
      name: 'conta-teste',
      user_id: '123123',
      account_type: '123123',
    });

    expect(account).toHaveProperty('id');
    expect(account.name).toBe('conta-teste');
    expect(account.user_id).toBe('123123');
    expect(account.account_type).toBe('123123');
  });
});
