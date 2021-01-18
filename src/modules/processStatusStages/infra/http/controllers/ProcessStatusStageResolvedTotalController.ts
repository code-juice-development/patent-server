import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ShowProcessStatusStageResolvedTotalService from '@modules/processStatusStages/services/ShowProcessStatusStageResolvedTotalService';

class ProcessStatusStageResolvedTotalController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { process_stage_id } = request.params;

    const showProcessStatusStageServiceTotal = container.resolve(
      ShowProcessStatusStageResolvedTotalService,
    );

    const amount = await showProcessStatusStageServiceTotal.execute({
      process_stage_id,
    });

    return response.json({ amount });
  }
}

export default ProcessStatusStageResolvedTotalController;
