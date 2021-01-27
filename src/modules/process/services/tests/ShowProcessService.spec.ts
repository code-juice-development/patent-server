import FakeProcessesRepository from '@modules/process/repositories/fakes/FakeProcessesRepository';
import FakeDispatchsRepository from '@modules/dispatchs/repositories/fakes/FakeDispatchsRepository';
import FakeProcessDispatchsRepository from '@modules/processDispatchs/repositories/fakes/FakeProcessDispatchsRepository';

import AppError from '@shared/errors/AppError';

import CreateProcessService from '@modules/process/services/CreateProcessService';
import ShowProcessService from '@modules/process/services/ShowProcessService';

let fakeProcessesRepository: FakeProcessesRepository;
let fakeDispatchsRepository: FakeDispatchsRepository;
let fakeProcessDispatchsRepository: FakeProcessDispatchsRepository;
let createProcessService: CreateProcessService;
let showProcessService: ShowProcessService;

describe('Show Process Service', () => {
  beforeEach(() => {
    fakeProcessesRepository = new FakeProcessesRepository();
    fakeDispatchsRepository = new FakeDispatchsRepository();
    fakeProcessDispatchsRepository = new FakeProcessDispatchsRepository();
    createProcessService = new CreateProcessService(
      fakeProcessesRepository,
      fakeDispatchsRepository,
      fakeProcessDispatchsRepository,
    );
    showProcessService = new ShowProcessService(fakeProcessesRepository);
  });

  it('should be able to show a Process', async () => {
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

    const { id } = process;

    const processFinded = await showProcessService.execute({ id });

    expect(process).toEqual(processFinded);
  });

  it('should not be able to show a inexistent Process', async () => {
    expect(
      showProcessService.execute({
        id: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
