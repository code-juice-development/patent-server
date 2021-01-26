import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowProcessDispatchResolvedTotalService from '@modules/processDispatchs/services/ShowProcessDispatchResolvedTotalService';

class ProcessDispatchResolvedTotalController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { dispatch_id } = request.params;

    const showProcessDispatchResolvedTotalService = container.resolve(
      ShowProcessDispatchResolvedTotalService,
    );

    const amount = await showProcessDispatchResolvedTotalService.execute({
      dispatch_id,
    });

    return response.json({ amount });
  }
}

export default ProcessDispatchResolvedTotalController;
