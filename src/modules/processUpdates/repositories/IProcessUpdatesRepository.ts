import ICreateProcessUpdateDTO from '@modules/processUpdates/dtos/ICreateProcessUpdateDTO';

import ProcessUpdate from '@modules/processUpdates/infra/typeorm/entities/ProcessUpdate';

export interface IDataFindIndexed {
  page: number;

  rows: number;

  ordenation: string;

  filter: {
    number: number | null;

    date: string | null;

    upload: string | null;

    description: string | null;
  };
}

export interface IResultFindIndexed {
  total: number;

  processUpdates: ProcessUpdate[];
}

interface IProcessUpdatesRepository {
  create(data: ICreateProcessUpdateDTO): Promise<ProcessUpdate>;

  delete(id: string): Promise<void>;

  findAll(): Promise<ProcessUpdate[]>;

  findById(id: string): Promise<ProcessUpdate | undefined>;

  findIndexed(data: IDataFindIndexed): Promise<IResultFindIndexed>;
}

export default IProcessUpdatesRepository;
