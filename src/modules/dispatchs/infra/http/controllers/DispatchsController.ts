import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateDispatchService from '@modules/dispatchs/services/CreateDispatchService';
import UpdateDispatchService from '@modules/dispatchs/services/UpdateDispatchService';
import DeleteDispatchService from '@modules/dispatchs/services/DeleteDispatchService';
import ListDispatchsIndexedService from '@modules/dispatchs/services/ListDispatchsIndexedService';
import ShowDispatchService from '@modules/dispatchs/services/ShowDispatchService';

class DispatchsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      code,
      description,
      deadline,
      send_message,
      model_message,
      send_email,
      model_email,
    } = request.body;

    const createDispatchService = container.resolve(CreateDispatchService);

    const processStage = await createDispatchService.execute({
      name,
      code,
      description,
      deadline,
      send_message,
      model_message,
      send_email,
      model_email,
    });

    return response.status(201).json(processStage);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      name,
      code,
      description,
      deadline,
      send_message,
      model_message,
      send_email,
      model_email,
    } = request.body;

    const updateDispatchService = container.resolve(UpdateDispatchService);

    const processStage = await updateDispatchService.execute({
      id,
      name,
      code,
      description,
      deadline,
      send_message,
      model_message,
      send_email,
      model_email,
    });

    return response.status(201).json(processStage);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteDispatchService = container.resolve(DeleteDispatchService);

    await deleteDispatchService.execute({ id });

    return response.status(204).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showDispatchService = container.resolve(ShowDispatchService);

    const processStage = await showDispatchService.execute({ id });

    return response.json(processStage);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const {
      page,
      rows,
      ordenation,
      name,
      code,
      description,
      deadline,
      send_message,
      send_email,
    } = request.query;

    const listDispatchsIndexedService = container.resolve(
      ListDispatchsIndexedService,
    );

    const page_verified = Number(page ?? 0);
    const rows_verified = Number(rows ?? 0);
    const ordenation_verified = String(ordenation ?? 'name');
    const name_verified = name ? String(name) : null;
    const code_verified = code ? String(code) : null;
    const description_verified = description ? String(description) : null;
    const deadline_verified = deadline ? String(deadline) : null;
    const send_message_verified = send_message ? send_message === 'true' : null;
    const send_email_verified = send_email ? send_email === 'true' : null;

    const { total, dispatchs } = await listDispatchsIndexedService.execute({
      page: page_verified,
      rows: rows_verified,
      ordenation: ordenation_verified,
      name: name_verified,
      code: code_verified,
      description: description_verified,
      deadline: deadline_verified,
      send_message: send_message_verified,
      send_email: send_email_verified,
    });

    response.header('Access-Control-Expose-Headers', 'X-Total-Count');
    response.header('X-Total-Count', String(total));

    return response.json(dispatchs);
  }
}

export default DispatchsController;
