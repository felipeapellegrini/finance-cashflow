// import AppError from '@shared/errors/AppError';
import FakeAccountTypesRepository from '../../../repositories/fakes/FakeAccountTypesRepository';
import DeleteAccountTypeService from '../services/DeleteAccountTypeService';

let fakeAccountTypesRepository: FakeAccountTypesRepository;
let deleteAccountType: DeleteAccountTypeService;

describe('DeleteAccountType', () => {
  beforeEach(() => {
    fakeAccountTypesRepository = new FakeAccountTypesRepository();
    deleteAccountType = new DeleteAccountTypeService(
      fakeAccountTypesRepository,
    );
  });
  it('should be able to delete an account type', async () => {
    const accountType1 = await fakeAccountTypesRepository.create({
      name: 'account-type',
      user_id: 'user',
    });

    await fakeAccountTypesRepository.create({
      name: 'account-type2',
      user_id: 'user',
    });

    await deleteAccountType.execute('user', accountType1.id);

    await expect(
      fakeAccountTypesRepository.findByName({
        user_id: 'user',
        name: 'account-type',
      }),
    ).resolves.toBeUndefined();
  });
});
