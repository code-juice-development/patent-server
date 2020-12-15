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

    const { id } = user;

    await updateUserService.execute({
      id,
      email: 'johnruan@example.com',
      name: 'John Ruan',
    });

    const userFinded = await fakeUsersRepository.findById(id);

    expect(userFinded?.id).toBe(id);
    expect(userFinded?.name).toBe('John Ruan');
    expect(userFinded?.email).toBe('johnruan@example.com');
  });
});
