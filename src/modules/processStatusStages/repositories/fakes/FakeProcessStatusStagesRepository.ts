import { v4 } from 'uuid';

import IProcessesRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
} from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';

import ICreateProcessStatusStageDTO from '@modules/processStatusStages/dtos/ICreateProcessStatusStageDTO';
import IUpdateProcessStatusStagesDTO from '@modules/processStatusStages/dtos/IUpdateProcessStatusStagesDTO';

import ProcessStatusStage from '@modules/processStatusStages/infra/typeorm/entities/ProcessStatusStage';

class FakeProcessStatusStagesRepository implements IProcessesRepository {
  private processStatusStages: ProcessStatusStage[];

  constructor() {
    this.processStatusStages = [];
  }

  public async create({
    has_pending,
    status_pending,
    resolved_pending,
    process_id,
    process_stage_id,
  }: ICreateProcessStatusStageDTO): Promise<ProcessStatusStage> {
    const processStatusStage = new ProcessStatusStage();

    const id = v4();

    Object.assign(processStatusStage, {
      id,
      has_pending,
      status_pending,
      resolved_pending,
      process_id,
      process_stage_id,
    });

    this.processStatusStages.push(processStatusStage);

    return processStatusStage;
  }

  public async update({
    id,
    has_pending,
    status_pending,
    resolved_pending,
    process_id,
    process_stage_id,
  }: IUpdateProcessStatusStagesDTO): Promise<ProcessStatusStage> {
    const processStatusStage = this.processStatusStages.find(
      (actualProcessStatusStage) => actualProcessStatusStage.id === id,
    );

    Object.assign(processStatusStage, {
      has_pending,
      status_pending,
      resolved_pending,
      process_id,
      process_stage_id,
    });

    return processStatusStage ?? new ProcessStatusStage();
  }

  public async updatePending(
    id: string,
    resolved_pending: boolean,
  ): Promise<ProcessStatusStage> {
    const processStatusStage = this.processStatusStages.find(
      (actualProcessStatusStage) => actualProcessStatusStage.id === id,
    );

    Object.assign(processStatusStage, {
      resolved_pending,
    });

    return processStatusStage ?? new ProcessStatusStage();
  }

  public async delete(id: string): Promise<void> {
    this.processStatusStages = this.processStatusStages.filter(
      (actualProcessStatusStage) => actualProcessStatusStage.id !== id,
    );
  }

  public async findAll(): Promise<ProcessStatusStage[]> {
    return this.processStatusStages;
  }

  public async findById(id: string): Promise<ProcessStatusStage | undefined> {
    const processStatusStage = this.processStatusStages.find(
      (actualProcessStatusStage) => actualProcessStatusStage.id === id,
    );

    return processStatusStage;
  }

  public async findByProcessId(
    process_id: string,
  ): Promise<ProcessStatusStage[]> {
    const processStatusStages = this.processStatusStages.filter(
      (actualProcessStatusStage) =>
        actualProcessStatusStage.process_id === process_id,
    );

    return processStatusStages;
  }

  public async findByProcessStageId(
    process_stage_id: string,
  ): Promise<ProcessStatusStage[]> {
    const processStatusStages = this.processStatusStages.filter(
      (actualProcessStatusStage) =>
        actualProcessStatusStage.process_stage_id === process_stage_id,
    );

    return processStatusStages;
  }

  /**
   * @todo Include ordering
   */
  public async findIndexed({
    page,
    rows,
    filter,
  }: IDataFindIndexed): Promise<IResultFindIndexed> {
    const {
      has_pending,
      resolved_pending,
      process_id,
      process_stage_id,
    } = filter;

    const total = this.processStatusStages.length;

    const filteredProcessStatusStages = this.processStatusStages.filter(
      (processStatusStage) => {
        if (
          has_pending != null &&
          processStatusStage.has_pending !== has_pending
        )
          return false;
        if (
          resolved_pending != null &&
          processStatusStage.resolved_pending !== resolved_pending
        )
          return false;
        if (process_id != null && processStatusStage.process_id !== process_id)
          return false;
        if (
          process_stage_id != null &&
          processStatusStage.process_stage_id !== process_stage_id
        )
          return false;

        return true;
      },
    );

    const process_status_stages = filteredProcessStatusStages.slice(
      page * rows,
      rows,
    );

    return { total, process_status_stages };
  }

  findProcessStagePendentActualTotal(
    process_stage_id: string,
  ): Promise<number> {
    throw new Error('Method not implemented.');
  }

  findProcessStageResolvedActualTotal(
    process_stage_id: string,
  ): Promise<number> {
    throw new Error('Method not implemented.');
  }
}

export default FakeProcessStatusStagesRepository;
