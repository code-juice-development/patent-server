import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProcessStatusStagesIndexedService from '@modules/processStatusStages/services/ListProcessStatusStagesIndexedService';
import ShowProcessStatusStageService from '@modules/processStatusStages/services/ShowProcessStatusStageService';

class ProcessesController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProcessStatusStageService = container.resolve(
      ShowProcessStatusStageService,
    );

    const processStatusStage = await showProcessStatusStageService.execute({
      id,
    });

    return response.json(processStatusStage);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const {
      page,
      rows,
      ordenation,
      has_pending,
      resolved_pending,
      process_id,
      process_stage_id,
    } = request.query;

    const listProcessesIndexedService = container.resolve(
      ListProcessStatusStagesIndexedService,
    );

    const page_verified = Number(page ?? 0);
    const rows_verified = Number(rows ?? 10);
    const ordenation_verified = String(ordenation ?? 'has_pending');
    const has_pending_verified = has_pending ? Boolean(has_pending) : null;
    const resolved_pending_verified = resolved_pending
      ? Boolean(resolved_pending)
      : null;
    const process_id_verified = process_id ? String(process_id) : null;
    const process_stage_id_verified = process_stage_id
      ? String(process_stage_id)
      : null;

    const {
      total,
      process_status_stages,
    } = await listProcessesIndexedService.execute({
      page: page_verified,
      rows: rows_verified,
      ordenation: ordenation_verified,
      has_pending: has_pending_verified,
      resolved_pending: resolved_pending_verified,
      process_id: process_id_verified,
      process_stage_id: process_stage_id_verified,
    });

    response.header('Access-Control-Expose-Headers', 'X-Total-Count');
    response.header('X-Total-Count', String(total));

    return response.json(process_status_stages);
  }
}

export default ProcessesController;
