import { injectable, inject } from 'tsyringe';

import IProcessDispatchsRepository from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';

interface IRequest {
  dispatch_id: string;
}

@injectable()
class ShowProcessDispatchResolvedTotalService {
  constructor(
    @inject('ProcessDispatchsRepository')
    private processDispatchsRepository: IProcessDispatchsRepository,
  ) {}

  public async execute({ dispatch_id }: IRequest): Promise<number> {
    const amount = await this.processDispatchsRepository.findDispatchResolvedActualTotal(
      dispatch_id,
    );

    return amount;
  }
}

export default ShowProcessDispatchResolvedTotalService;
