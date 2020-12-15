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

    const page_verified = Number(page ?? 0);
    const rows_verified = Number(rows ?? 10);
    const ordenation_verified = String(ordenation ?? 'name');
    const name_verified = name ? String(name) : null;
    const email_verified = email ? String(email) : null;
    const phone_verified = phone ? String(phone) : null;
    const cpf_verified = cpf ? String(cpf) : null;
    const cnpj_verified = cnpj ? String(cnpj) : null;

    const { total, clients } = await listClientsIndexedService.execute({
      page: page_verified,
      rows: rows_verified,
      ordenation: ordenation_verified,
      name: name_verified,
      email: email_verified,
      phone: phone_verified,
      cpf: cpf_verified,
      cnpj: cnpj_verified,
    });

    response.header('Access-Control-Expose-Headers', 'X-Total-Count');
    response.header('X-Total-Count', String(total));

    return response.json(clients);
  }
}

export default UsersController;
