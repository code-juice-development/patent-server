import { Repository, getRepository } from 'typeorm';

import IProcessRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
} from '@modules/process/repositories/IProcessesRepository';

import ICreateProcessDTO from '@modules/process/dtos/ICreateProcessDTO';
import IUpdateProcessDTO from '@modules/process/dtos/IUpdateProcessDTO';

import Process from '@modules/process/infra/typeorm/entities/Process';

class ProcessesRepository implements IProcessRepository {
  private repository: Repository<Process>;

  constructor() {
    this.repository = getRepository(Process);
  }

  public async create({
    number,
    brand,
    kind,
    presentation,
    last_update,
    birthday,
    client_id,
  }: ICreateProcessDTO): Promise<Process> {
    const process = this.repository.create({
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      client_id,
    });

    await this.repository.save(process);

    return process;
  }

  public async update({
    id,
    number,
    brand,
    kind,
    presentation,
    last_update,
    birthday,
    client_id,
  }: IUpdateProcessDTO): Promise<Process> {
    const process = this.repository.create({
      id,
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      client_id,
    });

    await this.repository.save(process);

    return process;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async findAll(): Promise<Process[]> {
    const processes = await this.repository.find();

    return processes;
  }

  public async findById(id: string): Promise<Process | undefined> {
    const process = this.repository.findOne({ id });

    return process;
  }

  public async findByNumber(number: string): Promise<Process | undefined> {
    const process = this.repository.findOne({ number });

    return process;
  }

  public async findByBrand(brand: string): Promise<Process | undefined> {
    const process = this.repository.findOne({ brand });

    return process;
  }

  public async findIndexed({
    page,
    rows,
    ordenation,
    filter,
  }: IDataFindIndexed): Promise<IResultFindIndexed> {
    const queryBuilder = this.repository.createQueryBuilder('process');

    const filters = Object.fromEntries(
      Object.entries(filter).filter((actualFilter) => actualFilter[1]),
    );

    queryBuilder.where(filters);
    queryBuilder.skip(page * rows);
    queryBuilder.take(rows);
    queryBuilder.orderBy(ordenation);

    const [processes, total] = await queryBuilder.getManyAndCount();

    return { total, processes };
  }
}

export default ProcessesRepository;
