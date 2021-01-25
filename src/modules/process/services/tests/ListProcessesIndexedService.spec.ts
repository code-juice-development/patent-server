import FakeProcessesRepository from '@modules/process/repositories/fakes/FakeProcessesRepository';
import FakeDispatchsRepository from '@modules/dispatchs/repositories/fakes/FakeDispatchsRepository';
import FakeProcessStatusStagesRepository from '@modules/processStatusStages/repositories/fakes/FakeProcessStatusStagesRepository';

import CreateProcessService from '@modules/process/services/CreateProcessService';
import ListProcessesIndexedService from '@modules/process/services/ListProcessesIndexedService';

let fakeProcessesRepository: FakeProcessesRepository;
let fakeDispatchsRepository: FakeDispatchsRepository;
let fakeProcessesStatusStagesRepository: FakeProcessStatusStagesRepository;
let createProcessService: CreateProcessService;
let listProcessesIndexedService: ListProcessesIndexedService;

describe('List Processes Indexed Service', () => {
  beforeEach(() => {
    fakeProcessesRepository = new FakeProcessesRepository();
    fakeDispatchsRepository = new FakeDispatchsRepository();
    fakeProcessesStatusStagesRepository = new FakeProcessStatusStagesRepository();
    createProcessService = new CreateProcessService(
      fakeProcessesRepository,
      fakeDispatchsRepository,
      fakeProcessesStatusStagesRepository,
    );
    listProcessesIndexedService = new ListProcessesIndexedService(
      fakeProcessesRepository,
    );
  });

  it('should be able to list a Processes', async () => {
    const clientJJMultimarcas = await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
      dispatch_id: '',
    });

    const clientGGGames = await createProcessService.execute({
      number: '151515',
      brand: 'GG Games',
      kind: 'Patentes',
      presentation: 'Visual',
      last_update: '15/01/2021',
      birthday: '15/01/2021',
      client_id: '6655',
      dispatch_id: '',
    });

    const responseClientsJJMultimarcas = await listProcessesIndexedService.execute(
      {
        page: 0,
        rows: 10,
        ordenation: '',
        number: null,
        brand: 'JJ Multimarcas',
        kind: null,
        presentation: null,
        last_update: null,
        birthday: null,
        client_id: null,
        pendent: null,
      },
    );

    const responseClientsGGGames = await listProcessesIndexedService.execute({
      page: 0,
      rows: 10,
      ordenation: '',
      number: null,
      brand: 'GG Games',
      kind: null,
      presentation: null,
      last_update: null,
      birthday: null,
      client_id: null,
      pendent: null,
    });

    // Count
    expect(responseClientsGGGames.total).toEqual(2);

    // JJ Multimarcas
    expect(responseClientsJJMultimarcas.processes).toContain(
      clientJJMultimarcas,
    );
    expect(responseClientsJJMultimarcas.processes).not.toContain(clientGGGames);

    // GG Marcas
    expect(responseClientsGGGames.processes).toContain(clientGGGames);
    expect(responseClientsGGGames.processes).not.toContain(clientJJMultimarcas);
  });
});
