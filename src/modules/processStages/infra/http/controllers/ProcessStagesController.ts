import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProcessStageService from '@modules/processStages/services/CreateProcessStageService';
import UpdateProcessStageService from '@modules/processStages/services/UpdateProcessStageService';
import DeleteProcessStageService from '@modules/processStages/services/DeleteProcessStageService';
import ListProcessStagesIndexedService from '@modules/processStages/services/ListProcessStagesIndexedService';
import ShowProcessStageService from '@modules/processStages/services/ShowProcessStageService';

class UsersController {
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

    const createProcessStageService = container.resolve(
      CreateProcessStageService,
    );

    const processStage = await createProcessStageService.execute({
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

    const updateProcessStageService = container.resolve(
      UpdateProcessStageService,
    );

    const processStage = await updateProcessStageService.execute({
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

    const deleteProcessStageService = container.resolve(
      DeleteProcessStageService,
    );

    await deleteProcessStageService.execute({ id });

    return response.status(204).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProcessStageService = container.resolve(ShowProcessStageService);

    const processStage = await showProcessStageService.execute({ id });

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

    const listProcessStagesIndexedService = container.resolve(
      ListProcessStagesIndexedService,
    );

    const page_verified = Number(page ?? 0);
    const rows_verified = Number(rows ?? 10);
    const ordenation_verified = String(ordenation ?? 'name');
    const name_verified = name ? String(name) : null;
    const code_verified = code ? String(code) : null;
    const description_verified = description ? String(description) : null;
    const deadline_verified = deadline ? String(deadline) : null;
    const send_message_verified = send_message ? send_message === 'true' : null;
    const send_email_verified = send_email ? send_email === 'true' : null;

    const {
      total,
      processStages,
    } = await listProcessStagesIndexedService.execute({
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

    return response.json(processStages);
  }
}

export default UsersController;
