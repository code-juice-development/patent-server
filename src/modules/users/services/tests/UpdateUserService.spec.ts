import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import UpdateUserService from '@modules/users/services/UpdateUserService';

let fakeUsersRepository: FakeUsersRepository;
let updateUserService: UpdateUserService;

describe('Update Users Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUserService = new UpdateUserService(fakeUsersRepository);
  });

  it('should be able to update a User', async () => {
    const user = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'root',
    });

    const updateUser = await updateUserService.execute({
      id: user.id,
      email: 'johnruan@example.com',
      name: 'John Ruan',
    });

    expect(updateUser.id).toBe(user.id);
    expect(updateUser.name).toBe('John Ruan');
    expect(updateUser.email).toBe('johnruan@example.com');
  });
});
