import { injectable, inject } from 'tsyringe';

import IDispatchsRepository from '@modules/dispatchs/repositories/IDispatchsRepository';

import Dispatch from '@modules/dispatchs/infra/typeorm/entities/Dispatch';

interface IResponse {
  dispatch: Dispatch;
  total: number;
  date: string;
}

@injectable()
class ListDispatchsTotalPendentService {
  constructor(
    @inject('DispatchsRepository')
    private dispatchsRepository: IDispatchsRepository,
  ) {}

  public async execute(): Promise<IResponse[]> {
    const response = await this.dispatchsRepository.findDispatchTotalPendent();

    return response;
  }
}

export default ListDispatchsTotalPendentService;
