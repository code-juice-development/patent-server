import { Repository, getRepository } from 'typeorm';

import IProcessStagesRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
} from '@modules/processStages/repositories/IProcessStagesRepository';

import ICreateProcessStagesDTO from '@modules/processStages/dtos/ICreateProcessStagesDTO';
import IUpdateProcessStagesDTO from '@modules/processStages/dtos/IUpdateProcessStagesDTO';

import ProcessStage from '@modules/processStages/infra/typeorm/entities/ProcessStage';

class ClientsRepository implements IProcessStagesRepository {
  private repository: Repository<ProcessStage>;

  constructor() {
    this.repository = getRepository(ProcessStage);
  }

  public async create({
    name,
    code,
    description,
    deadline,
    send_message,
    model_message,
    send_email,
    model_email,
  }: ICreateProcessStagesDTO): Promise<ProcessStage> {
    const processStage = this.repository.create({
      name,
      code,
      description,
      deadline,
      send_message,
      model_message,
      send_email,
      model_email,
    });

    await this.repository.save(processStage);

    return processStage;
  }

  public async update({
    id,
    name,
    code,
    description,
    deadline,
    send_message,
    model_message,
    send_email,
    model_email,
  }: IUpdateProcessStagesDTO): Promise<ProcessStage> {
    const processStage = this.repository.create({
      id,
      name,
      code,
      description,
      deadline,
      send_message,
      model_message,
      send_email,
      model_email,
    });

    await this.repository.save(processStage);

    return processStage;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async findAll(): Promise<ProcessStage[]> {
    const processStage = await this.repository.find();

    return processStage;
  }

  public async findById(id: string): Promise<ProcessStage | undefined> {
    const processStage = await this.repository.findOne(id);

    return processStage;
  }

  public async findByName(name: string): Promise<ProcessStage | undefined> {
    const processStage = await this.repository.findOne({ name });

    return processStage;
  }

  public async findByCode(code: string): Promise<ProcessStage | undefined> {
    const processStage = await this.repository.findOne({ code });

    return processStage;
  }

  public async findIndexed({
    page,
    rows,
    ordenation,
    filter,
  }: IDataFindIndexed): Promise<IResultFindIndexed> {
    const queryBuilder = this.repository.createQueryBuilder('process_stages');

    const filters = Object.fromEntries(
      Object.entries(filter).filter((actualFilter) => actualFilter[1]),
    );

    queryBuilder.where(filters);
    queryBuilder.skip(page * rows);
    queryBuilder.take(rows);
    queryBuilder.orderBy(ordenation);

    const [processStages, total] = await queryBuilder.getManyAndCount();

    return { total, processStages };
  }
}

export default ClientsRepository;
