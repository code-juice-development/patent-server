import { injectable, inject } from 'tsyringe';

import Jobs from '@shared/infra/bull';

import IProcessStatusStagesRepository from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';
import IProcessStagesRepository from '@modules/processStages/repositories/IProcessStagesRepository';
import IProcessesRepository from '@modules/process/repositories/IProcessesRepository';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import ProcessStatusStage from '@modules/processStatusStages/infra/typeorm/entities/ProcessStatusStage';

interface IRequest {
  has_pending: boolean;

  status_pending: string;

  resolved_pending: boolean;

  process_id: string;

  process_stage_id: string;
}

@injectable()
class CreateProcessStatusStageService {
  constructor(
    @inject('ProcessStatusStagesRepository')
    private processStatusStagesRepository: IProcessStatusStagesRepository,

    @inject('ProcessStagesRepository')
    private processStagesRepository: IProcessStagesRepository,

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
    process_stage_id,
  }: IRequest): Promise<ProcessStatusStage> {
    const processStatusStage = await this.processStatusStagesRepository.create({
      has_pending,
      status_pending,
      resolved_pending,
      process_id,
      process_stage_id,
    });

    const processStage = await this.processStagesRepository.findById(
      process_stage_id,
    );
    const process = await this.processesRepository.findById(process_id);

    if (processStage && processStage.send_email && process) {
      const client = await this.clientsRepository.findById(process.client_id);

      if (client) {
        const { MailJob } = Jobs;

        const { model_email } = processStage;

        await MailJob.add({ model_email, client });
      }
    }

    return processStatusStage;
  }
}

export default CreateProcessStatusStageService;
