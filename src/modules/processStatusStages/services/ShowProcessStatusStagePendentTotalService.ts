import { injectable, inject } from 'tsyringe';

import IProcessStatusStagesRepository from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';

interface IRequest {
  dispatch_id: string;
}

@injectable()
class ShowProcessStatusStagePendentTotalService {
  constructor(
    @inject('ProcessStatusStagesRepository')
    private processStatusStagesRepository: IProcessStatusStagesRepository,
  ) {}

  public async execute({ dispatch_id }: IRequest): Promise<number> {
    const amount = await this.processStatusStagesRepository.findDispatchPendentActualTotal(
      dispatch_id,
    );

    return amount;
  }
}

export default ShowProcessStatusStagePendentTotalService;
