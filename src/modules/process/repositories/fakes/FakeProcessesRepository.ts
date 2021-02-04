import { v4 } from 'uuid';

import IProcessesRepository, {
  IDataFindIndexed,
  IResultFindIndexed,
} from '@modules/process/repositories/IProcessesRepository';

import ICreateProcessDTO from '@modules/process/dtos/ICreateProcessDTO';
import IUpdateProcessDTO from '@modules/process/dtos/IUpdateProcessDTO';

import Process from '@modules/process/infra/typeorm/entities/Process';

class FakeProcessesRepository implements IProcessesRepository {
  private processes: Process[];

  constructor() {
    this.processes = [];
  }

  public async create({
    number,
    brand,
    kind,
    presentation,
    last_update,
    birthday,
    filed,
    client_id,
  }: ICreateProcessDTO): Promise<Process> {
    const process = new Process();

    const id = v4();

    Object.assign(process, {
      id,
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      filed,
      client_id,
    });

    this.processes.push(process);

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
    filed,
    client_id,
  }: IUpdateProcessDTO): Promise<Process> {
    const process = this.processes.find(
      (actualProcess) => actualProcess.id === id,
    );

    Object.assign(process, {
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      filed,
      client_id,
    });

    return process ?? new Process();
  }

  public async delete(id: string): Promise<void> {
    this.processes = this.processes.filter(
      (actualProcess) => actualProcess.id !== id,
    );
  }

  public async findAll(): Promise<Process[]> {
    return this.processes;
  }

  public async countAll(): Promise<number> {
    return this.processes.length;
  }

  public async findById(id: string): Promise<Process | undefined> {
    const process = this.processes.find(
      (actualProcess) => actualProcess.id === id,
    );

    return process;
  }

  public async findByNumber(number: string): Promise<Process | undefined> {
    const process = this.processes.find(
      (actualProcess) => actualProcess.number === number,
    );

    return process;
  }

  public async findByBrand(brand: string): Promise<Process | undefined> {
    const process = this.processes.find(
      (actualProcess) => actualProcess.brand === brand,
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
    const {
      number,
      brand,
      kind,
      presentation,
      last_update,
      birthday,
      filed,
      client_id,
    } = filter;

    const total = this.processes.length;

    const filteredProcesses = this.processes.filter((process) => {
      if (number !== null && process.number !== number) return false;
      if (brand !== null && process.brand !== brand) return false;
      if (kind !== null && process.kind !== kind) return false;
      if (presentation !== null && process.presentation !== presentation)
        return false;
      if (last_update !== null && process.last_update !== last_update)
        return false;
      if (filed !== null && process.filed !== filed) return false;
      if (birthday !== null && process.birthday !== birthday) return false;
      if (client_id !== null && process.client_id !== client_id) return false;

      return true;
    });

    const processes = filteredProcesses.slice(page * rows, rows);

    return { total, processes };
  }

  public async findAllBirthdays(): Promise<Process[]> {
    throw new Error('Method not implemented.');
  }
}

export default FakeProcessesRepository;
