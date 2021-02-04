import { v4 } from 'uuid';

import IProcessUpdatesRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
} from '@modules/processUpdates/repositories/IProcessUpdatesRepository';

import ICreateProcessUpdateDTO from '@modules/processUpdates/dtos/ICreateProcessUpdateDTO';

import ProcessUpdate from '@modules/processUpdates/infra/typeorm/entities/ProcessUpdate';

class FakeProcessUpdatesRepository implements IProcessUpdatesRepository {
  private processUpdates: ProcessUpdate[];

  constructor() {
    this.processUpdates = [];
  }

  public async create({
    number,
    date,
    upload,
    description,
  }: ICreateProcessUpdateDTO): Promise<ProcessUpdate> {
    const processUpdate = new ProcessUpdate();

    const id = v4();

    Object.assign(processUpdate, {
      id,
      number,
      date,
      upload,
      description,
    });

    this.processUpdates.push(processUpdate);

    return processUpdate;
  }

  public async delete(id: string): Promise<void> {
    this.processUpdates = this.processUpdates.filter(
      (actualProcess) => actualProcess.id !== id,
    );
  }

  public async findAll(): Promise<ProcessUpdate[]> {
    return this.processUpdates;
  }

  public async findById(id: string): Promise<ProcessUpdate | undefined> {
    const process = this.processUpdates.find(
      (actualProcess) => actualProcess.id === id,
    );

    return process;
  }

  /**
   * @todo Include ordering
   */
  public async findIndexed({
    page,
    rows,
    filter,
  }: IDataFindIndexed): Promise<IResultFindIndexed> {
    const { number, date, upload, description } = filter;

    const total = this.processUpdates.length;

    const filteredProcesses = this.processUpdates.filter((process) => {
      if (number !== null && process.number !== number) return false;
      if (date !== null && process.date !== date) return false;
      if (upload !== null && process.upload !== upload) return false;
      if (description !== null && process.description !== description)
        return false;

      return true;
    });

    const processUpdates = filteredProcesses.slice(page * rows, rows);

    return { total, processUpdates };
  }
}

export default FakeProcessUpdatesRepository;
