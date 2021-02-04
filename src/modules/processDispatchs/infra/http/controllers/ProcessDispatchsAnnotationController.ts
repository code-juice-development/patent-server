import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProcessDispatchAnnotationService from '@modules/processDispatchs/services/UpdateProcessDispatchAnnotationService';

class ProcessDispatchsAnnotationController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { annotation } = request.body;

    const updateProcessDispatchAnnotationService = container.resolve(
      UpdateProcessDispatchAnnotationService,
    );

    const processdispatch = await updateProcessDispatchAnnotationService.execute(
      {
        id,
        annotation,
      },
    );

    return response.status(201).json(processdispatch);
  }
}

export default ProcessDispatchsAnnotationController;
