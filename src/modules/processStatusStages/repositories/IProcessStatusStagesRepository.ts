import ICreateProcessStatusStageDTO from '@modules/processStatusStages/dtos/ICreateProcessStatusStageDTO';
import IUpdateProcessStatusStagesDTO from '@modules/processStatusStages/dtos/IUpdateProcessStatusStagesDTO';

import ProcessStatusStage from '@modules/processStatusStages/infra/typeorm/entities/ProcessStatusStage';

export interface IDataFindIndexed {
  page: number;

  rows: number;

  ordenation: string;

  filter: {
    has_pending: boolean | null;

    resolved_pending: boolean | null;

    process_id: string | null;

    dispatch_id: string | null;
  };
}

export interface IResultFindIndexed {
  total: number;

  process_status_stages: ProcessStatusStage[];
}

interface IProcessStatusStagesRepository {
  create(data: ICreateProcessStatusStageDTO): Promise<ProcessStatusStage>;

  update(data: IUpdateProcessStatusStagesDTO): Promise<ProcessStatusStage>;

  updatePending(
    id: string,
    resolved_pending: boolean,
  ): Promise<ProcessStatusStage>;

  delete(id: string): Promise<void>;

  findAll(): Promise<ProcessStatusStage[]>;

  findById(id: string): Promise<ProcessStatusStage | undefined>;

  findByProcessId(process_id: string): Promise<ProcessStatusStage[]>;

  findByDispatchId(dispatch_id: string): Promise<ProcessStatusStage[]>;

  findIndexed(data: IDataFindIndexed): Promise<IResultFindIndexed>;

  findDispatchPendentActualTotal(dispatch_id: string): Promise<number>;

  findDispatchResolvedActualTotal(dispatch_id: string): Promise<number>;
}

export default IProcessStatusStagesRepository;
