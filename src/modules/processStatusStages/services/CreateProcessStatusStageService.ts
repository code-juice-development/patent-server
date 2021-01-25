import { injectable, inject } from 'tsyringe';

import Jobs from '@shared/infra/bull';

import IProcessStatusStagesRepository from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';
import IDispatchsRepository from '@modules/dispatchs/repositories/IDispatchsRepository';
import IProcessesRepository from '@modules/process/repositories/IProcessesRepository';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import ProcessStatusStage from '@modules/processStatusStages/infra/typeorm/entities/ProcessStatusStage';

interface IRequest {
  has_pending: boolean;

  status_pending: string;

  resolved_pending: boolean;

  process_id: string;

  dispatch_id: string;
}

@injectable()
class CreateProcessStatusStageService {
  constructor(
    @inject('ProcessStatusStagesRepository')
    private processStatusStagesRepository: IProcessStatusStagesRepository,

    @inject('DispatchsRepository')
    private dispatchsRepository: IDispatchsRepository,

    @inject('ProcessesRepository')
    private processesRepository: IProcessesRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    has_pending,
    status_pending,
    resolved_pending,
    process_id,
    dispatch_id,
  }: IRequest): Promise<ProcessStatusStage> {
    const processStatusStage = await this.processStatusStagesRepository.create({
      has_pending,
      status_pending,
      resolved_pending,
      process_id,
      dispatch_id,
    });

    const dispatch = await this.dispatchsRepository.findById(dispatch_id);
    const process = await this.processesRepository.findById(process_id);

    if (dispatch && dispatch.send_email && process) {
      const client = await this.clientsRepository.findById(process.client_id);

      if (client) {
        const { MailJob } = Jobs;

        const { model_email } = dispatch;

        await MailJob.add({ model_email, client });
      }
    }

    return processStatusStage;
  }
}

export default CreateProcessStatusStageService;
