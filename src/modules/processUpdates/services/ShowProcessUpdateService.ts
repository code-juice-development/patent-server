import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProcessUpdatesRepository from '@modules/processUpdates/repositories/IProcessUpdatesRepository';

import ProcessUpdate from '@modules/processUpdates/infra/typeorm/entities/ProcessUpdate';

interface IRequest {
  id: string;
}

@injectable()
class ShowProcessUpdateService {
  constructor(
    @inject('ProcessUpdatesRepository')
    private processUpdatesRepository: IProcessUpdatesRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<ProcessUpdate> {
    const processUpdate = await this.processUpdatesRepository.findById(id);

    if (!processUpdate) {
      throw new AppError(
        'Não contrado Atualização do Processo com o ID informado',
      );
    }

    return processUpdate;
  }
}

export default ShowProcessUpdateService;
