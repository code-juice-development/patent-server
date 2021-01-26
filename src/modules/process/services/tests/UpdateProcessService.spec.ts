import AppError from '@shared/errors/AppError';

import FakeProcessesRepository from '@modules/process/repositories/fakes/FakeProcessesRepository';
import FakeDispatchsRepository from '@modules/dispatchs/repositories/fakes/FakeDispatchsRepository';
import FakeProcessDispatchsRepository from '@modules/processDispatchs/repositories/fakes/FakeProcessDispatchsRepository';

import CreateProcessService from '@modules/process/services/CreateProcessService';
import UpdateProcessService from '@modules/process/services/UpdateProcessService';

let fakeProcessesRepository: FakeProcessesRepository;
let fakeDispatchsRepository: FakeDispatchsRepository;
let fakeProcessDispatchsRepository: FakeProcessDispatchsRepository;
let createProcessService: CreateProcessService;
let updateProcessService: UpdateProcessService;

describe('Update Process Service', () => {
  beforeEach(() => {
    fakeProcessesRepository = new FakeProcessesRepository();
    fakeDispatchsRepository = new FakeDispatchsRepository();
    fakeProcessDispatchsRepository = new FakeProcessDispatchsRepository();
    createProcessService = new CreateProcessService(
      fakeProcessesRepository,
      fakeDispatchsRepository,
      fakeProcessDispatchsRepository,
    );
    updateProcessService = new UpdateProcessService(fakeProcessesRepository);
  });

  it('should be able to update a Process', async () => {
    const { id } = await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
      dispatch_id: '',
    });

    await updateProcessService.execute({
      id,
      number: '156156',
      brand: 'GG Games',
      kind: 'Patentes',
      presentation: 'Visual',
      last_update: '15/01/2021',
      birthday: '15/01/2021',
      client_id: '6655',
    });

    const process = await fakeProcessesRepository.findById(id);

    expect(process?.brand).toBe('GG Games');
    expect(process?.kind).toBe('Patentes');
    expect(process?.presentation).toBe('Visual');
    expect(process?.last_update).toBe('15/01/2021');
    expect(process?.birthday).toBe('15/01/2021');
    expect(process?.client_id).toBe('6655');
  });

  it('should not be able to update a Process with the same number', async () => {
    await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
      dispatch_id: '',
    });

    const { id } = await createProcessService.execute({
      number: '151515',
      brand: 'GG Games',
      kind: 'Patentes',
      presentation: 'Visual',
      last_update: '15/01/2021',
      birthday: '15/01/2021',
      client_id: '6655',
      dispatch_id: '',
    });

    expect(
      updateProcessService.execute({
        id,
        number: '156156',
        brand: 'GG Games',
        kind: 'Patentes',
        presentation: 'Visual',
        last_update: '15/01/2021',
        birthday: '15/01/2021',
        client_id: '6655',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a Process with the same brand', async () => {
    await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
      dispatch_id: '',
    });

    const { id } = await createProcessService.execute({
      number: '151515',
      brand: 'GG Games',
      kind: 'Patentes',
      presentation: 'Visual',
      last_update: '15/01/2021',
      birthday: '15/01/2021',
      client_id: '6655',
      dispatch_id: '',
    });

    expect(
      updateProcessService.execute({
        id,
        number: '151515',
        brand: 'JJ Multimarcas',
        kind: 'Patentes',
        presentation: 'Visual',
        last_update: '15/01/2021',
        birthday: '15/01/2021',
        client_id: '6655',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
