// import AppError from '@shared/errors/AppError';
import FakeAccountTypesRepository from '../../../repositories/fakes/FakeAccountTypesRepository';
import CreateAccountTypeService from '../services/CreateAccountTypeService';

let fakeAccountTypesRepository: FakeAccountTypesRepository;
let createAccountType: CreateAccountTypeService;

describe('CreateAccountType', () => {
  beforeEach(() => {
    fakeAccountTypesRepository = new FakeAccountTypesRepository();
    createAccountType = new CreateAccountTypeService(
      fakeAccountTypesRepository,
    );
  });
  it('should be able to create an account type', async () => {
    const accountType = await createAccountType.execute({
      name: 'account-type',
      user_id: 'user',
    });

    expect(accountType).toHaveProperty('id');
    expect(accountType.user_id).toBe('user');
    expect(accountType.name).toBe('account-type');
  });
});
