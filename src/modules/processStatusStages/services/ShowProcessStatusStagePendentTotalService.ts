import { injectable, inject } from 'tsyringe';

import IProcessStatusStagesRepository from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';

interface IRequest {
  process_stage_id: string;
}

@injectable()
class ShowProcessStatusStagePendentTotalService {
  constructor(
    @inject('ProcessStatusStagesRepository')
    private processStatusStagesRepository: IProcessStatusStagesRepository,
  ) {}

  public async execute({ process_stage_id }: IRequest): Promise<number> {
    const amount = await this.processStatusStagesRepository.findProcessStagePendentActualTotal(
      process_stage_id,
    );

    return amount;
  }
}

export default ShowProcessStatusStagePendentTotalService;
