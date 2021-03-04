import { Repository, getRepository } from 'typeorm';

import IProcessUpdatesRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
} from '@modules/processUpdates/repositories/IProcessUpdatesRepository';

import ICreateProcessUpdateDTO from '@modules/processUpdates/dtos/ICreateProcessUpdateDTO';
import IUpdateProcessUpdateDTO from '@modules/processUpdates/dtos/IUpdateProcessUpdateDTO';

import ProcessUpdate from '@modules/processUpdates/infra/typeorm/entities/ProcessUpdate';

class ProcessUpdatesRepository implements IProcessUpdatesRepository {
  private repository: Repository<ProcessUpdate>;

  constructor() {
    this.repository = getRepository(ProcessUpdate);
  }

  public async create({
    number,
    date,
    upload,
    description,
  }: ICreateProcessUpdateDTO): Promise<ProcessUpdate> {
    const processUpdate = this.repository.create({
      number,
      date,
      upload,
      description,
    });

    await this.repository.save(processUpdate);

    return processUpdate;
  }

  public async update({
    id,
    number,
    date,
    upload,
    description,
  }: IUpdateProcessUpdateDTO): Promise<ProcessUpdate> {
    const processUpdate = this.repository.create({
      id,
      number,
      date,
      upload,
      description,
    });

    await this.repository.save(processUpdate);

    return processUpdate;
  }

  public async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  public async findAll(): Promise<ProcessUpdate[]> {
    const processUpdates = await this.repository.find();

    return processUpdates;
  }

  public async findById(id: string): Promise<ProcessUpdate | undefined> {
    const processUpdate = await this.repository.findOne({ id });

    return processUpdate;
  }

  public async findIndexed({
    page,
    rows,
    ordenation,
    filter,
  }: IDataFindIndexed): Promise<IResultFindIndexed> {
    const queryBuilder = this.repository.createQueryBuilder('process_update');

    const { description } = filter;

    const filters = Object.fromEntries(
      Object.entries(filter).filter(
        (actualFilter) =>
          actualFilter[1] !== null &&
          !['description'].includes(actualFilter[0]),
      ),
    );

    queryBuilder.where(filters).orderBy(ordenation);

    if (description) {
      description.split(' ').forEach((word) =>
        queryBuilder.andWhere(
          `translate(lower(process_update.description), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc') like 
        '%'||translate(lower('${word}'), 'àáâãäéèëêíìïîóòõöôúùüûç', 'aaaaaeeeeiiiiooooouuuuc')||'%'`,
        ),
      );
    }

    if (rows > 0) {
      queryBuilder.skip(page * rows).take(rows);
    }

    const [processUpdates, total] = await queryBuilder.getManyAndCount();

    return { total, processUpdates };
  }
}

export default ProcessUpdatesRepository;
