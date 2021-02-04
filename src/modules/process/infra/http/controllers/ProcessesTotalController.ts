import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProcessesTotalService from '@modules/process/services/ListProcessesTotalService';

class ProcessesTotalController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listProcessesTotalService = container.resolve(
      ListProcessesTotalService,
    );

    const count = await listProcessesTotalService.execute();

    return response.json(count);
  }
}

export default ProcessesTotalController;
