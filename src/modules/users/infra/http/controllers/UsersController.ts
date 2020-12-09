import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ListUsersService from '@modules/users/services/ListUsersService';
import ShowUserService from '@modules/users/services/ShowUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ email, name, password });

    delete user.password;

    return response.status(201).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { email, name } = request.body;

    const updateUserService = container.resolve(UpdateUserService);

    const user = await updateUserService.execute({ id, email, name });

    delete user.password;

    return response.status(201).json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteUserService = container.resolve(DeleteUserService);

    await deleteUserService.execute({ id });

    return response.status(204).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUserService = container.resolve(ShowUserService);

    const user = await showUserService.execute({ id });

    delete user.password;

    return response.json(user);
  }

  public async index(_request: Request, response: Response): Promise<Response> {
    const listUsersService = container.resolve(ListUsersService);

    const users = await listUsersService.execute();

    users.forEach((user) => {
      // eslint-disable-next-line no-param-reassign
      delete user.password;
    });

    return response.json(users);
  }
}

export default UsersController;
