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
    const { id } = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'root',
    });

    await updateUserService.execute({
      id,
      email: 'johnruan@example.com',
      name: 'John Ruan',
    });

    const user = await fakeUsersRepository.findById(id);

    expect(user?.id).toBe(id);
    expect(user?.name).toBe('John Ruan');
    expect(user?.email).toBe('johnruan@example.com');
  });
});
