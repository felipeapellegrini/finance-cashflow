import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeHashProvier: FakeHashProvider;
let fakeUsersRepository: FakeUsersRepository;
let authenticate: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeHashProvier = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    authenticate = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvier,
    );
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvier);
  });
  it('should be able to authenticate an user', async () => {
    const user = await createUser.execute({
      name: 'user',
      email: 'user@mail.com',
      password: '123456',
    });

    const response = await authenticate.execute({
      email: 'user@mail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toBe(user);
  });

  it('should not be able to authenticate an user with wrong email', async () => {
    await expect(
      authenticate.execute({
        email: 'user@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with wrong password', async () => {
    await createUser.execute({
      name: 'user',
      email: 'user@mail.com',
      password: '123456',
    });

    await expect(
      authenticate.execute({
        email: 'user@mail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
