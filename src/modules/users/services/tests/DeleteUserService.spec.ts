import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import DeleteUserService from '@modules/users/services/DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let deleteUserService: DeleteUserService;

describe('Delete User Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    deleteUserService = new DeleteUserService(fakeUsersRepository);
  });

  it('should be able to delete a User', async () => {
    const { id } = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'root',
    });

    await deleteUserService.execute({ id });

    const user = await fakeUsersRepository.findById(id);

    expect(user).toEqual(undefined);
  });
});
