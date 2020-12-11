import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import Client from '@modules/clients/infra/typeorm/entities/Client';

interface IRequest {
  id: string;

  name: string;

  email: string;

  phone: string;

  cpf: string;

  cnpj: string;
}

@injectable()
class UpdateClientService {
  constructor(
    @inject('ClientsRepository') private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    id,
    name,
    email,
    phone,
    cpf,
    cnpj,
  }: IRequest): Promise<Client> {
    const userWithSameEmail = await this.clientsRepository.findByCpf(email);

    if (userWithSameEmail && userWithSameEmail.id !== id) {
      throw new AppError('Já existe um cliente cadastrado com esse E-mail');
    }

    const userWithSamePhone = await this.clientsRepository.findByPhone(phone);

    if (userWithSamePhone && userWithSamePhone.id !== id) {
      throw new AppError('Já existe um cliente cadastrado com esse Telefone');
    }

    const userWithSameCpf = await this.clientsRepository.findByCpf(cpf);

    if (userWithSameCpf && userWithSameCpf.id !== id) {
      throw new AppError('Já existe um cliente cadastrado com esse CPF');
    }

    const userWithSameCnpj = await this.clientsRepository.findByCpf(cnpj);

    if (userWithSameCnpj && userWithSameCnpj.id !== id) {
      throw new AppError('Já existe um cliente cadastrado com esse CNPJ');
    }

    const user = await this.clientsRepository.update({
      id,
      name,
      email,
      phone,
      cpf,
      cnpj,
    });

    return user;
  }
}

export default UpdateClientService;
