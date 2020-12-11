import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientService from '@modules/clients/services/CreateClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';
import DeleteClientService from '@modules/clients/services/DeleteClientService';
import ListClientsIndexedService from '@modules/clients/services/ListClientsIndexedService';
import ShowClientService from '@modules/clients/services/ShowClientService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, cpf, cnpj } = request.body;

    const createClientService = container.resolve(CreateClientService);

    const client = await createClientService.execute({
      name,
      email,
      phone,
      cpf,
      cnpj,
    });

    return response.status(201).json(client);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, phone, cpf, cnpj } = request.body;

    const updateClientService = container.resolve(UpdateClientService);

    const user = await updateClientService.execute({
      id,
      name,
      email,
      phone,
      cpf,
      cnpj,
    });

    return response.status(201).json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteClientService = container.resolve(DeleteClientService);

    await deleteClientService.execute({ id });

    return response.status(204).send();
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showClientService = container.resolve(ShowClientService);

    const client = await showClientService.execute({ id });

    return response.json(client);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const {
      page,
      rows,
      ordenation,
      name,
      email,
      phone,
      cpf,
      cnpj,
    } = request.query;

    const listClientsIndexedService = container.resolve(
      ListClientsIndexedService,
    );

    const users = await listClientsIndexedService.execute({
      page: Number(page ?? 0),
      rows: Number(rows ?? 10),
      ordenation: String(ordenation ?? ''),
      name: String(name ?? ''),
      email: String(email ?? ''),
      phone: String(phone ?? ''),
      cpf: String(cpf ?? ''),
      cnpj: String(cnpj ?? ''),
    });

    return response.json(users);
  }
}

export default UsersController;
