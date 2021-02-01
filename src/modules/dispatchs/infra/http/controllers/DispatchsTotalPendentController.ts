import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDispatchTotalPendentService from '@modules/dispatchs/services/ListDispatchTotalPendentService';

class DispatchsTotalPendentController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listDispatchTotalPendentService = container.resolve(
      ListDispatchTotalPendentService,
    );

    const dispatchsTotal = await listDispatchTotalPendentService.execute();

    return response.json(dispatchsTotal);
  }
}

export default DispatchsTotalPendentController;
