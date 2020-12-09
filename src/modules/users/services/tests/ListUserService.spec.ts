import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import ListUsersService from '@modules/users/services/ListUsersService';

let fakeUsersRepository: FakeUsersRepository;
let listUsersService: ListUsersService;

describe('List Users Service', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listUsersService = new ListUsersService(fakeUsersRepository);
  });

  it('should be able to list all Users', async () => {
    const userJohnDoe = await fakeUsersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password: 'root',
    });

    const userJohnDue = await fakeUsersRepository.create({
      email: 'johndue@example.com',
      name: 'John Due',
      password: 'root',
    });

    const users = await listUsersService.execute();

    expect(users).toContain(userJohnDoe);
    expect(users).toContain(userJohnDue);
  });
});
