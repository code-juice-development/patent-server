import { Repository, getRepository } from 'typeorm';

import IProcessesRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
} from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';

import ICreateProcessStatusStageDTO from '@modules/processStatusStages/dtos/ICreateProcessStatusStageDTO';
import IUpdateProcessStatusStagesDTO from '@modules/processStatusStages/dtos/IUpdateProcessStatusStagesDTO';

import ProcessStatusStage from '@modules/processStatusStages/infra/typeorm/entities/ProcessStatusStage';

class ProcessStatusStagesRepository implements IProcessesRepository {
  private repository: Repository<ProcessStatusStage>;

  constructor() {
    this.repository = getRepository(ProcessStatusStage);
  }

  public async create({
    has_pending,
    status_pending,
    resolved_pending,
    process_id,
    process_stage_id,
  }: ICreateProcessStatusStageDTO): Promise<ProcessStatusStage> {
    const processStatusStage = this.repository.create({
      has_pending,
      status_pending,
      resolved_pending,
      process_id,
      process_stage_id,
    });

    await this.repository.save(processStatusStage);

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
    const processStatusStage = this.repository.create({
      id,
      has_pending,
      status_pending,
      resolved_pending,
      process_id,
      process_stage_id,
    });

    await this.repository.save(processStatusStage);

    return processStatusStage;
  }

  public async updatePending(
    id: string,
    resolved_pending: boolean,
  ): Promise<ProcessStatusStage> {
    const processStatusStage = this.repository.create({
      id,
      resolved_pending,
    });

    await this.repository.save(processStatusStage);

    return processStatusStage;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async findAll(): Promise<ProcessStatusStage[]> {
    const processStatusStages = await this.repository.find();

    return processStatusStages;
  }

  public async findById(id: string): Promise<ProcessStatusStage | undefined> {
    const processStatusStage = this.repository.findOne({ id });

    return processStatusStage;
  }

  public async findIndexed({
    page,
    rows,
    ordenation,
    filter,
  }: IDataFindIndexed): Promise<IResultFindIndexed> {
    const queryBuilder = this.repository.createQueryBuilder(
      'process_status_stage',
    );

    const filters = Object.fromEntries(
      Object.entries(filter).filter((actualFilter) => actualFilter[1] !== null),
    );

    queryBuilder.where(filters);
    queryBuilder.skip(page * rows);
    queryBuilder.take(rows);
    queryBuilder.orderBy(ordenation);

    const [process_status_stages, total] = await queryBuilder.getManyAndCount();

    return { total, process_status_stages };
  }
}

export default ProcessStatusStagesRepository;
