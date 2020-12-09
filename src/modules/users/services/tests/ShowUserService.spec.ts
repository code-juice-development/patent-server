import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ShowUserService from '@modules/users/services/ShowUserService';

let fakeUsersRepository: FakeUsersRepository;
let showUserService: ShowUserService;

describe('Show Users Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showUserService = new ShowUserService(fakeUsersRepository);
  });

  it('should be able to show a User', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'root',
    });

    const findUser = await showUserService.execute({ id: user.id });

    expect(user).toEqual(findUser);
  });

  it('should not be able to show a nonexistent User', async () => {
    expect(
      showUserService.execute({
        id: 'nonexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
