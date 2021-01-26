import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowProcessDispatchPendentTotalService from '@modules/processDispatchs/services/ShowProcessDispatchPendentTotalService';

class ProcessDispatchPendentTotalController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { dispatch_id } = request.params;

    const showProcessDispatchPendentTotalService = container.resolve(
      ShowProcessDispatchPendentTotalService,
    );

    const amount = await showProcessDispatchPendentTotalService.execute({
      dispatch_id,
    });

    return response.json({ amount });
  }
}

export default ProcessDispatchPendentTotalController;
