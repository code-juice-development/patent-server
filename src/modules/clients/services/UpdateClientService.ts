import { injectable, inject } from 'tsyringe';
import { cpf as cpfValidator, cnpj as cnpjValidator } from 'cpf-cnpj-validator';

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
    const userWithSameEmail = await this.clientsRepository.findByEmail(email);

    if (userWithSameEmail && userWithSameEmail.id !== id) {
      throw new AppError('Já existe um cliente cadastrado com esse E-mail');
    }

    const userWithSamePhone = await this.clientsRepository.findByPhone(phone);

    if (userWithSamePhone && userWithSamePhone.id !== id) {
      throw new AppError('Já existe um cliente cadastrado com esse Telefone');
    }

    if (!cpf && !cnpj) {
      throw new AppError('É necessário informar ao menos um CPF ou CNPJ');
    }

    if (cpf) {
      if (cpfValidator.isValid(cpf)) {
        const userWithSameCpf = await this.clientsRepository.findByCpf(cpf);

        if (userWithSameCpf && userWithSameCpf.id !== id) {
          throw new AppError('Já existe um cliente cadastrado com esse CPF');
        }
      } else {
        throw new AppError('O CPF informado é inválido');
      }
    }

    if (cnpj) {
      if (cnpjValidator.isValid(cnpj)) {
        const userWithSameCnpj = await this.clientsRepository.findByCnpj(cnpj);

        if (userWithSameCnpj && userWithSameCnpj.id !== id) {
          throw new AppError('Já existe um cliente cadastrado com esse CNPJ');
        }
      } else {
        throw new AppError('O CNPJ informado é inválido');
      }
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
