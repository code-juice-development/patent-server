import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDispatchsRepository from '@modules/dispatchs/repositories/IDispatchsRepository';

import Dispatch from '@modules/dispatchs/infra/typeorm/entities/Dispatch';

interface IRequest {
  id: string;
}

@injectable()
class ShowDispatchService {
  constructor(
    @inject('DispatchsRepository')
    private dispatchsRepository: IDispatchsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Dispatch> {
    const dispatch = await this.dispatchsRepository.findById(id);

    if (!dispatch) {
      throw new AppError('Não encontrada Despacho com o ID informado');
    }

    return dispatch;
  }
}

export default ShowDispatchService;
