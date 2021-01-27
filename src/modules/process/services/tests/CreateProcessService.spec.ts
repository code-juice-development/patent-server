import AppError from '@shared/errors/AppError';

import FakeProcessesRepository from '@modules/process/repositories/fakes/FakeProcessesRepository';
import FakeDispatchsRepository from '@modules/dispatchs/repositories/fakes/FakeDispatchsRepository';
import FakeProcessDispatchsRepository from '@modules/processDispatchs/repositories/fakes/FakeProcessDispatchsRepository';

import CreateProcessService from '@modules/process/services/CreateProcessService';

let fakeProcessesRepository: FakeProcessesRepository;
let fakeDispatchsRepository: FakeDispatchsRepository;
let fakeProcessDispatchsRepository: FakeProcessDispatchsRepository;
let createProcessService: CreateProcessService;

describe('Create Process Service', () => {
  beforeEach(() => {
    fakeProcessesRepository = new FakeProcessesRepository();
    fakeDispatchsRepository = new FakeDispatchsRepository();
    fakeProcessDispatchsRepository = new FakeProcessDispatchsRepository();
    createProcessService = new CreateProcessService(
      fakeProcessesRepository,
      fakeDispatchsRepository,
      fakeProcessDispatchsRepository,
    );
  });

  it('should be able to create a new Process', async () => {
    const process = await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      filed: false,
      client_id: '95342393000128',
      dispatch_id: '',
    });

    expect(process).toHaveProperty('id');
  });

  it('should be able to create a new Process with initial Dispatch', async () => {
    const dispatch = await fakeDispatchsRepository.create({
      name: 'Reavaliação',
      code: 'X4568',
      description: 'Reavaliar o requerimento pendente no protocolo',
      deadline: '15',
      send_message: true,
      model_message: 'Oi, etapa atualizada',
      send_email: false,
      model_email: '',
    });

    const process = await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      filed: false,
      client_id: '95342393000128',
      dispatch_id: dispatch.id,
    });

    const processDispatchs = await fakeProcessDispatchsRepository.findByProcessId(
      process.id,
    );

    const processDispatch = processDispatchs.pop();

    expect(processDispatch?.dispatch_id).toEqual(dispatch.id);
  });

  it('should not be able to create a new Process with the same number', async () => {
    await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      filed: false,
      client_id: '95342393000128',
      dispatch_id: '',
    });

    expect(
      createProcessService.execute({
        number: '156156',
        brand: 'GG Games',
        kind: 'Marcas e Patentes',
        presentation: 'Visual',
        last_update: '01/01/2021',
        birthday: '01/01/2021',
        filed: false,
        client_id: '95342393000128',
        dispatch_id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Process with the same brand', async () => {
    await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      filed: false,
      client_id: '95342393000128',
      dispatch_id: '',
    });

    expect(
      createProcessService.execute({
        number: '151515',
        brand: 'JJ Multimarcas',
        kind: 'Marcas e Patentes',
        presentation: 'Visual',
        last_update: '01/01/2021',
        birthday: '01/01/2021',
        filed: false,
        client_id: '95342393000128',
        dispatch_id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
