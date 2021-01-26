import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProcessDispatchsRepository from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';

import ProcessDispatch from '@modules/processDispatchs/infra/typeorm/entities/ProcessDispatch';

interface IRequest {
  id: string;
}

@injectable()
class ShowProcessDispatchService {
  constructor(
    @inject('ProcessDispatchsRepository')
    private processDispatchsRepository: IProcessDispatchsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<ProcessDispatch> {
    const processDispatch = await this.processDispatchsRepository.findById(id);

    if (!processDispatch) {
      throw new AppError(
        'Não encontrado Processo x Despacho com o ID informado',
      );
    }

    return processDispatch;
  }
}

export default ShowProcessDispatchService;
