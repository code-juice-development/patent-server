import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProcessDispatchPendingService from '@modules/processDispatchs/services/UpdateProcessDispatchPendingService';
import ListProcessDispatchsIndexedService from '@modules/processDispatchs/services/ListProcessDispatchsIndexedService';
import ShowProcessDispatchService from '@modules/processDispatchs/services/ShowProcessDispatchService';

class ProcessDispatchsController {
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

    return response.json(processdispatch);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProcessDispatchService = container.resolve(
      ShowProcessDispatchService,
    );

    const processdispatch = await showProcessDispatchService.execute({
      id,
    });

    return response.json(processdispatch);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const {
      page,
      rows,
      ordenation,
      has_pending,
      resolved_pending,
      process_id,
      dispatch_id,
    } = request.query;

    const listProcessDispatchsIndexedService = container.resolve(
      ListProcessDispatchsIndexedService,
    );

    const page_verified = Number(page ?? 0);
    const rows_verified = Number(rows ?? 10);
    const ordenation_verified = String(ordenation ?? 'has_pending');
    const has_pending_verified = has_pending ? has_pending === 'true' : null;
    const resolved_pending_verified = resolved_pending
      ? resolved_pending === 'true'
      : null;
    const process_id_verified = process_id ? String(process_id) : null;
    const dispatch_id_verified = dispatch_id ? String(dispatch_id) : null;

    const {
      total,
      process_dispatchs,
    } = await listProcessDispatchsIndexedService.execute({
      page: page_verified,
      rows: rows_verified,
      ordenation: ordenation_verified,
      has_pending: has_pending_verified,
      resolved_pending: resolved_pending_verified,
      process_id: process_id_verified,
      dispatch_id: dispatch_id_verified,
    });

    response.header('Access-Control-Expose-Headers', 'X-Total-Count');
    response.header('X-Total-Count', String(total));

    return response.json(process_dispatchs);
  }
}

export default ProcessDispatchsController;
