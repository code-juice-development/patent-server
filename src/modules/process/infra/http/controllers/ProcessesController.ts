import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProcessService from '@modules/process/services/CreateProcessService';
import UpdateProcessService from '@modules/process/services/UpdateProcessService';
import DeleteProcessService from '@modules/process/services/DeleteProcessService';
import ListProcessesIndexedService from '@modules/process/services/ListProcessesIndexedService';
import ShowProcessService from '@modules/process/services/ShowProcessService';

class ProcessesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      client_id,
      dispatch_id,
    } = request.body;

    const createProcessService = container.resolve(CreateProcessService);

    const process = await createProcessService.execute({
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      client_id,
      dispatch_id,
    });

    return response.status(201).json(process);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      client_id,
    } = request.body;

    const updateProcessService = container.resolve(UpdateProcessService);

    const process = await updateProcessService.execute({
      id,
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      client_id,
    });

    return response.status(201).json(process);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProcessService = container.resolve(DeleteProcessService);

    await deleteProcessService.execute({ id });

    return response.status(204).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProcessService = container.resolve(ShowProcessService);

    const process = await showProcessService.execute({ id });

    return response.json(process);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const {
      page,
      rows,
      ordenation,
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      client_id,
      pendent,
    } = request.query;

    const listProcessesIndexedService = container.resolve(
      ListProcessesIndexedService,
    );

    const page_verified = Number(page ?? 0);
    const rows_verified = Number(rows ?? 10);
    const ordenation_verified = String(ordenation ?? 'number');
    const number_verified = number ? String(number) : null;
    const brand_verified = brand ? String(brand) : null;
    const kind_verified = kind ? String(kind) : null;
    const presentation_verified = presentation ? String(presentation) : null;
    const last_update_verified = last_update ? String(last_update) : null;
    const birthday_verified = birthday ? String(birthday) : null;
    const client_id_verified = client_id ? String(client_id) : null;
    const pendent_verified = pendent ? pendent === 'true' : null;

    const { total, processes } = await listProcessesIndexedService.execute({
      page: page_verified,
      rows: rows_verified,
      ordenation: ordenation_verified,
      number: number_verified,
      brand: brand_verified,
      kind: kind_verified,
      presentation: presentation_verified,
      last_update: last_update_verified,
      birthday: birthday_verified,
      client_id: client_id_verified,
      pendent: pendent_verified,
    });

    response.header('Access-Control-Expose-Headers', 'X-Total-Count');
    response.header('X-Total-Count', String(total));

    return response.json(processes);
  }
}

export default ProcessesController;
