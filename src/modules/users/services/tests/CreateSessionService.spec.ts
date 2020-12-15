import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeTokenProvider from '@modules/users/providers/TokenProvider/fakes/FakeTokenProvider';

import CreateUserService from '@modules/users/services/CreateUserService';
import CreateSessionService from '@modules/users/services/CreateSessionService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let fakeTokenProvider: FakeTokenProvider;
let createUserService: CreateUserService;
let createSessionService: CreateSessionService;

describe('Create Session Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeTokenProvider = new FakeTokenProvider();

    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    createSessionService = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider,
    );
  });

  it('should be able to create a new Session', async () => {
    const user = await createUserService.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'root',
    });

    const response = await createSessionService.execute({
      email: 'johndoe@example.com',
      password: 'root',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to create a new Session with non existing User', async () => {
    expect(
      createSessionService.execute({
        email: 'johndoe@example.com',
        password: 'root',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Session with wrong password', async () => {
    await createUserService.execute({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'root',
    });

    expect(
      createSessionService.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
