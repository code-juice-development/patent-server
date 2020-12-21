import FakeProcessesRepository from '@modules/process/repositories/fakes/FakeProcessesRepository';

import CreateProcessService from '@modules/process/services/CreateProcessService';
import ListProcessesService from '@modules/process/services/ListProcessesService';

let fakeProcessRepository: FakeProcessesRepository;
let createProcessService: CreateProcessService;
let listProcessesService: ListProcessesService;

describe('List Processes Service', () => {
  beforeEach(() => {
    fakeProcessRepository = new FakeProcessesRepository();
    createProcessService = new CreateProcessService(fakeProcessRepository);
    listProcessesService = new ListProcessesService(fakeProcessRepository);
  });

  it('should be able to list all Process', async () => {
    const processJJMultimarcas = await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
    });

    const processGGGames = await createProcessService.execute({
      number: '151515',
      brand: 'GG Games',
      kind: 'Patentes',
      presentation: 'Visual',
      last_update: '15/01/2021',
      birthday: '15/01/2021',
      client_id: '6655',
    });

    const processesFinded = await listProcessesService.execute();

    expect(processesFinded).toContain(processJJMultimarcas);
    expect(processesFinded).toContain(processGGGames);
  });
});
