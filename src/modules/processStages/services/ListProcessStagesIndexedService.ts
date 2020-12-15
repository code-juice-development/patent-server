import { injectable, inject } from 'tsyringe';

import IProcessStagesRepository from '@modules/processStages/repositories/IProcessStagesRepository';

import ProcessStage from '@modules/processStages/infra/typeorm/entities/ProcessStage';

interface IRequest {
  page: number;

  rows: number;

  ordenation: string;

  name: string | null;

  code: string | null;

  description: string | null;

  deadline: string | null;

  send_message: boolean | null;

  send_email: boolean | null;
}

interface IResponse {
  total: number;

  processStages: ProcessStage[];
}

@injectable()
class ListProcessStagesIndexedService {
  constructor(
    @inject('ProcessStagesRepository')
    private processStagesRepository: IProcessStagesRepository,
  ) {}

  public async execute({
    page,
    rows,
    ordenation,
    name,
    code,
    description,
    deadline,
    send_message,
    send_email,
  }: IRequest): Promise<IResponse> {
    const {
      total,
      processStages,
    } = await this.processStagesRepository.findIndexed({
      page,
      rows,
      ordenation,
      filter: { name, code, description, deadline, send_message, send_email },
    });

    return { total, processStages };
  }
}

export default ListProcessStagesIndexedService;
