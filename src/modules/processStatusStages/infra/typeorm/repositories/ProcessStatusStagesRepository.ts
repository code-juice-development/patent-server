import { Repository, getRepository, Brackets } from 'typeorm';

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
    const processStatusStage = this.repository.findOne(
      { id },
      {
        relations: ['processStage'],
      },
    );

    return processStatusStage;
  }

  public async findByProcessId(
    process_id: string,
  ): Promise<ProcessStatusStage[]> {
    const processStatusStages = this.repository.find({
      where: { process_id },
      relations: ['processStage'],
    });

    return processStatusStages;
  }

  public async findByProcessStageId(
    process_stage_id: string,
  ): Promise<ProcessStatusStage[]> {
    const processStatusStages = this.repository.find({
      where: { process_stage_id },
      relations: ['processStage'],
    });

    return processStatusStages;
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

    queryBuilder.innerJoinAndSelect(
      'process_status_stage.processStage',
      'processStages',
    );

    const filters = Object.fromEntries(
      Object.entries(filter).filter((actualFilter) => actualFilter[1] !== null),
    );

    queryBuilder.where(filters);
    queryBuilder.skip(page * rows);
    queryBuilder.take(rows);
    queryBuilder.orderBy(`process_status_stage.${ordenation}`);

    const [process_status_stages, total] = await queryBuilder.getManyAndCount();

    return { total, process_status_stages };
  }

  public async findProcessStagePendentActualTotal(
    process_stage_id: string,
  ): Promise<number> {
    const queryBuilder = this.repository.createQueryBuilder(
      'process_status_stage',
    );

    queryBuilder
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('process_status_stage.id')
          .from(ProcessStatusStage, 'process_status_stage')
          .where('process_status_stage.process_stage_id = :process_stage_id')
          .orderBy(
            'process_status_stage.process_id, process_status_stage.created_at',
            'DESC',
          )
          .distinctOn(['process_status_stage.process_id'])
          .getQuery();

        return `process_status_stage.id IN (${subQuery})`;
      })
      .andWhere(
        new Brackets((we) => {
          we.where('has_pending = true').andWhere('resolved_pending = false');
        }),
      )
      .setParameter('process_stage_id', process_stage_id);

    const amount = (await queryBuilder.getMany()).length;

    return amount;
  }

  public async findProcessStageResolvedActualTotal(
    process_stage_id: string,
  ): Promise<number> {
    const queryBuilder = this.repository.createQueryBuilder(
      'process_status_stage',
    );

    queryBuilder
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('process_status_stage.id')
          .from(ProcessStatusStage, 'process_status_stage')
          .where('process_status_stage.process_stage_id = :process_stage_id')
          .orderBy(
            'process_status_stage.process_id, process_status_stage.created_at',
            'DESC',
          )
          .distinctOn(['process_status_stage.process_id'])
          .getQuery();

        return `process_status_stage.id IN (${subQuery})`;
      })
      .andWhere(
        new Brackets((we) => {
          we.where('has_pending = false').orWhere(
            new Brackets((we2) => {
              we2
                .where('has_pending = true')
                .andWhere('resolved_pending = true');
            }),
          );
        }),
      )
      .setParameter('process_stage_id', process_stage_id);

    const amount = (await queryBuilder.getMany()).length;

    return amount;
  }
}

export default ProcessStatusStagesRepository;
