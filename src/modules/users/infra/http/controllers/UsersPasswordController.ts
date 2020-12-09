import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserPasswordService from '@modules/users/services/UpdateUserPasswordService';

class UsersPasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { password, new_password } = request.body;

    const updateUserPasswordService = container.resolve(
      UpdateUserPasswordService,
    );

    await updateUserPasswordService.execute({ id, password, new_password });

    return response.status(204).send();
  }
}

export default UsersPasswordController;
