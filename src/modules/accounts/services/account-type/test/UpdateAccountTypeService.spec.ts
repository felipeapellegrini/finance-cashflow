import AppError from '@shared/errors/AppError';
import FakeAccountTypesRepository from '../../../repositories/fakes/FakeAccountTypesRepository';
import UpdateAccountTypeService from '../services/UpdateAccountTypeService';

let fakeAccountTypesRepository: FakeAccountTypesRepository;
let updateAccountType: UpdateAccountTypeService;

describe('UpdateAccountType', () => {
  beforeEach(() => {
    fakeAccountTypesRepository = new FakeAccountTypesRepository();
    updateAccountType = new UpdateAccountTypeService(
      fakeAccountTypesRepository,
    );
  });
  it('should be able to update an account type', async () => {
    const accountType = await fakeAccountTypesRepository.create({
      user_id: 'user',
      name: 'account type',
    });

    const updatedAccountType = await updateAccountType.execute({
      user_id: 'user',
      id: accountType.id,
      new_name: 'new account type',
    });

    expect(updatedAccountType.name).toBe('new account type');
  });

  it('should not be able to set new account type name to an existing one', async () => {
    const accountType = await fakeAccountTypesRepository.create({
      user_id: 'user',
      name: 'account type',
    });

    await fakeAccountTypesRepository.create({
      user_id: 'user',
      name: 'existing account type',
    });

    await expect(
      updateAccountType.execute({
        user_id: 'user',
        id: accountType.id,
        new_name: 'existing account type',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update an non existing account type', async () => {
    await expect(
      updateAccountType.execute({
        user_id: 'user',
        id: 'non-existing id',
        new_name: 'new account type',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
