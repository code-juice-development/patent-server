import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProcessDispatchPendingService from '@modules/processDispatchs/services/UpdateProcessDispatchPendingService';

class ProcessDispatchsPendingController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { resolved_pending } = request.body;

    const updateProcessDispatchPendingService = container.resolve(
      UpdateProcessDispatchPendingService,
    );

    const processdispatch = await updateProcessDispatchPendingService.execute({
      id,
      resolved_pending,
    });

    return response.status(201).json(processdispatch);
  }
}

export default ProcessDispatchsPendingController;
