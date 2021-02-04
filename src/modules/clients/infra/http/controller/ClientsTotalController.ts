import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListClientsTotalService from '@modules/clients/services/ListClientsTotalService';

class ClientsTotalController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listClientsTotalService = container.resolve(ListClientsTotalService);

    const count = await listClientsTotalService.execute();

    return response.json(count);
  }
}

export default ClientsTotalController;
