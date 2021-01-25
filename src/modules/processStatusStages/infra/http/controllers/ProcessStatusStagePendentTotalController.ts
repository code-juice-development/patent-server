import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowProcessStatusStagePendentTotalService from '@modules/processStatusStages/services/ShowProcessStatusStagePendentTotalService';

class ProcessStatusStagePendentTotalController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { dispatch_id } = request.params;

    const showProcessStatusStageServiceTotal = container.resolve(
      ShowProcessStatusStagePendentTotalService,
    );

    const amount = await showProcessStatusStageServiceTotal.execute({
      dispatch_id,
    });

    return response.json({ amount });
  }
}

export default ProcessStatusStagePendentTotalController;
