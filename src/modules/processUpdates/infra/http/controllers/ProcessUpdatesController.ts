import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateProcessUpdateService from '@modules/processUpdates/services/CreateProcessUpdateService';
import ShowProcessUpdateService from '@modules/processUpdates/services/ShowProcessUpdateService';
import DeleteProcessUpdateService from '@modules/processUpdates/services/DeleteProcessUpdateService';
import ListProcessUpdatesIndexedService from '@modules/processUpdates/services/ListProcessUpdatesIndexedService';

class ProcessUpdateController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createProcessUpdateService = new CreateProcessUpdateService();

    const { path } = request.file;

    await createProcessUpdateService.execute({ path });

    return response.status(201).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProcessUpdateService = container.resolve(
      DeleteProcessUpdateService,
    );

    await deleteProcessUpdateService.execute({ id });

    return response.status(204).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProcessUpdateService = container.resolve(
      ShowProcessUpdateService,
    );

    const processUpdate = await showProcessUpdateService.execute({ id });

    return response.json(processUpdate);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const {
      page,
      rows,
      ordenation,
      number,
      date,
      upload,
      description,
    } = request.query;

    const listProcessUpdatesIndexedService = container.resolve(
      ListProcessUpdatesIndexedService,
    );

    const page_verified = Number(page ?? 0);
    const rows_verified = Number(rows ?? 10);
    const ordenation_verified = String(ordenation ?? 'number');
    const number_verified = number ? Number(number) : null;
    const date_verified = date ? String(date) : null;
    const upload_verified = upload ? String(upload) : null;
    const description_verified = description ? String(description) : null;

    const {
      total,
      processUpdates,
    } = await listProcessUpdatesIndexedService.execute({
      page: page_verified,
      rows: rows_verified,
      ordenation: ordenation_verified,
      number: number_verified,
      date: date_verified,
      upload: upload_verified,
      description: description_verified,
    });

    response.header('Access-Control-Expose-Headers', 'X-Total-Count');
    response.header('X-Total-Count', String(total));

    return response.json(processUpdates);
  }
}

export default ProcessUpdateController;
