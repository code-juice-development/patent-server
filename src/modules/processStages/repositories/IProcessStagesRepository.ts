import ICreateProcessStagesDTO from '@modules/processStages/dtos/ICreateProcessStagesDTO';
import IUpdateProcessStagesDTO from '@modules/processStages/dtos/IUpdateProcessStagesDTO';

import ProcessStage from '@modules/processStages/infra/typeorm/entities/ProcessStage';

export interface IDataFindIndexed {
  page: number;

  rows: number;

  ordenation: string;

  filter: {
    name: string | null;

    code: string | null;

    description: string | null;

    deadline: string | null;

    send_message: boolean | null;

    send_email: boolean | null;
  };
}

export interface IResultFindIndexed {
  total: number;

  processStages: ProcessStage[];
}

interface IProcessStagesRepository {
  create(data: ICreateProcessStagesDTO): Promise<ProcessStage>;

  update(data: IUpdateProcessStagesDTO): Promise<ProcessStage>;

  delete(id: string): Promise<void>;

  findAll(): Promise<ProcessStage[]>;

  findById(id: string): Promise<ProcessStage | undefined>;

  findByName(name: string): Promise<ProcessStage | undefined>;

  findByCode(code: string): Promise<ProcessStage | undefined>;

  findIndexed(data: IDataFindIndexed): Promise<IResultFindIndexed>;
}

export default IProcessStagesRepository;
