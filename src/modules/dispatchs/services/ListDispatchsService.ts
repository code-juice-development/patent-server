import { injectable, inject } from 'tsyringe';

import IDispatchsRepository from '@modules/dispatchs/repositories/IDispatchsRepository';

import Dispatch from '@modules/dispatchs/infra/typeorm/entities/Dispatch';

@injectable()
class ListDispatchsService {
  constructor(
    @inject('DispatchsRepository')
    private dispatchsRepository: IDispatchsRepository,
  ) {}

  public async execute(): Promise<Dispatch[]> {
    const dispatchs = await this.dispatchsRepository.findAll();

    return dispatchs;
  }
}

export default ListDispatchsService;
