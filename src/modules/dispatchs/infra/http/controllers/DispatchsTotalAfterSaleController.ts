import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDispatchTotalAfterSaleService from '@modules/dispatchs/services/ListDispatchTotalAfterSaleService';

class DispatchsTotalAfterSaleController {
  public async index(_request: Request, response: Response): Promise<Response> {
    const listDispatchTotalAfterSaleService = container.resolve(
      ListDispatchTotalAfterSaleService,
    );

    const dispatchsTotal = await listDispatchTotalAfterSaleService.execute();

    return response.json(dispatchsTotal);
  }
}

export default DispatchsTotalAfterSaleController;
