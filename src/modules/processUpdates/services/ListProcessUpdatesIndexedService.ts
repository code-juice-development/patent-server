import { injectable, inject } from 'tsyringe';

import IProcessUpdatesRepository from '@modules/processUpdates/repositories/IProcessUpdatesRepository';

import ProcessUpdate from '@modules/processUpdates/infra/typeorm/entities/ProcessUpdate';

interface IRequest {
  page: number;

  rows: number;

  ordenation: string;

  number: number | null;

  date: string | null;

  upload: string | null;

  description: string | null;
}

interface IResponse {
  total: number;

  processUpdates: ProcessUpdate[];
}

@injectable()
class ListProcessUpdatesIndexedService {
  constructor(
    @inject('ProcessUpdatesRepository')
    private processUpdatesRepository: IProcessUpdatesRepository,
  ) {}

  public async execute({
    page,
    rows,
    ordenation,
    number,
    date,
    upload,
    description,
  }: IRequest): Promise<IResponse> {
    const {
      total,
      processUpdates,
    } = await this.processUpdatesRepository.findIndexed({
      page,
      rows,
      ordenation,
      filter: {
        number,
        date,
        upload,
        description,
      },
    });

    return { total, processUpdates };
  }
}

export default ListProcessUpdatesIndexedService;
