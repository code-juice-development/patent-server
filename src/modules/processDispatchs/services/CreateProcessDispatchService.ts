import { injectable, inject } from 'tsyringe';

import Jobs from '@shared/infra/bull';

import IProcessDispatchsRepository from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';
import IDispatchsRepository from '@modules/dispatchs/repositories/IDispatchsRepository';
import IProcessesRepository from '@modules/process/repositories/IProcessesRepository';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

import ProcessDispatch from '@modules/processDispatchs/infra/typeorm/entities/ProcessDispatch';

interface IRequest {
  has_pending: boolean;

  status_pending: string;

  resolved_pending: boolean;

  publication: string;

  process_id: string;

  dispatch_id: string;
}

@injectable()
class CreateProcessDispatchService {
  constructor(
    @inject('ProcessDispatchsRepository')
    private processDispatchsRepository: IProcessDispatchsRepository,

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
    publication,
    process_id,
    dispatch_id,
  }: IRequest): Promise<ProcessDispatch> {
    const processDispatch = await this.processDispatchsRepository.create({
      has_pending,
      status_pending,
      resolved_pending,
      publication,
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

    return processDispatch;
  }
}

export default CreateProcessDispatchService;
