import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDispatchsRepository from '@modules/dispatchs/repositories/IDispatchsRepository';

import Dispatch from '@modules/dispatchs/infra/typeorm/entities/Dispatch';

interface IRequest {
  name: string;

  code: string;

  description: string;

  deadline: number | null;

  send_message: boolean;

  model_message: string;

  send_email: boolean;

  model_email: string;

  after_sale: number | null;
}

@injectable()
class CreateDispatchService {
  constructor(
    @inject('DispatchsRepository')
    private dispatchsRepository: IDispatchsRepository,
  ) {}

  public async execute({
    name,
    code,
    description,
    deadline,
    send_message,
    model_message,
    send_email,
    model_email,
    after_sale,
  }: IRequest): Promise<Dispatch> {
    const dispatchWithSameCode = await this.dispatchsRepository.findByCode(
      code,
    );

    if (dispatchWithSameCode) {
      throw new AppError('Já existe um Despacho cadastrado com este Código');
    }

    const dispatch = await this.dispatchsRepository.create({
      name,
      code,
      description,
      deadline,
      send_message,
      model_message,
      send_email,
      model_email,
      after_sale,
    });

    return dispatch;
  }
}

export default CreateDispatchService;
