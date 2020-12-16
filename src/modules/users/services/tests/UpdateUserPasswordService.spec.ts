import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import UpdateUserPasswordService from '@modules/users/services/UpdateUserPasswordService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateUserPasswordService: UpdateUserPasswordService;

describe('Update User Password Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateUserPasswordService = new UpdateUserPasswordService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update a User password', async () => {
    const { id, password } = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'root',
    });

    await updateUserPasswordService.execute({
      id,
      password: 'root',
      new_password: 'admin',
    });

    expect(
      fakeHashProvider.compareHash(String(password), 'admin'),
    ).toBeTruthy();
  });

  it('should be not able to update a password of incorret User', async () => {
    expect(
      updateUserPasswordService.execute({
        id: 'inexistent-id',
        password: 'root',
        new_password: 'admin',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a password if informed the old password incorrectly', async () => {
    const { id } = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'root',
    });

    expect(
      updateUserPasswordService.execute({
        id,
        password: 'admin',
        new_password: 'root',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
