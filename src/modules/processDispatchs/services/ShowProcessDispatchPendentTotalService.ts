import { injectable, inject } from 'tsyringe';

import IProcessDispatchsRepository from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';

interface IRequest {
  dispatch_id: string;
}

@injectable()
class ShowProcessDispatchPendentTotalService {
  constructor(
    @inject('ProcessDispatchsRepository')
    private processDispatchsRepository: IProcessDispatchsRepository,
  ) {}

  public async execute({ dispatch_id }: IRequest): Promise<number> {
    const amount = await this.processDispatchsRepository.findDispatchPendentActualTotal(
      dispatch_id,
    );

    return amount;
  }
}

export default ShowProcessDispatchPendentTotalService;
