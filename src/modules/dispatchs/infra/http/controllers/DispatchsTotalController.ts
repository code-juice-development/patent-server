import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDispatchTotalService from '@modules/dispatchs/services/ListDispatchTotalService';

class DispatchsTotalController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listDispatchTotalService = container.resolve(
      ListDispatchTotalService,
    );

    const dispatchsTotal = await listDispatchTotalService.execute();

    return response.json(dispatchsTotal);
  }
}

export default DispatchsTotalController;
