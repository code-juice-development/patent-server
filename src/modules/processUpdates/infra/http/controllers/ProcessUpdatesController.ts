import { Request, Response } from 'express';

import CreateProcessUpdateService from '@modules/processUpdates/services/CreateProcessUpdateService';

class ProcessUpdateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createProcessUpdateService = new CreateProcessUpdateService();

    const { path } = request.file;

    await createProcessUpdateService.execute({ path });

    return response.status(201).send();
  }
}

export default ProcessUpdateController;
