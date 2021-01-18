import FakeProcessesRepository from '@modules/process/repositories/fakes/FakeProcessesRepository';
import FakeProcessStagesRepository from '@modules/processStages/repositories/fakes/FakeProcessStagesRepository';
import FakeProcessStatusStagesRepository from '@modules/processStatusStages/repositories/fakes/FakeProcessStatusStagesRepository';

import CreateProcessService from '@modules/process/services/CreateProcessService';
import ListProcessesService from '@modules/process/services/ListProcessesService';

let fakeProcessesRepository: FakeProcessesRepository;
let fakeProcessesStagesRepository: FakeProcessStagesRepository;
let fakeProcessesStatusStagesRepository: FakeProcessStatusStagesRepository;
let createProcessService: CreateProcessService;
let listProcessesService: ListProcessesService;

describe('List Processes Service', () => {
  beforeEach(() => {
    fakeProcessesRepository = new FakeProcessesRepository();
    fakeProcessesStagesRepository = new FakeProcessStagesRepository();
    fakeProcessesStatusStagesRepository = new FakeProcessStatusStagesRepository();
    createProcessService = new CreateProcessService(
      fakeProcessesRepository,
      fakeProcessesStagesRepository,
      fakeProcessesStatusStagesRepository,
    );
    listProcessesService = new ListProcessesService(fakeProcessesRepository);
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
      process_stage_id: '',
    });

    const processGGGames = await createProcessService.execute({
      number: '151515',
      brand: 'GG Games',
      kind: 'Patentes',
      presentation: 'Visual',
      last_update: '15/01/2021',
      birthday: '15/01/2021',
      client_id: '6655',
      process_stage_id: '',
    });

    const processesFinded = await listProcessesService.execute();

    expect(processesFinded).toContain(processJJMultimarcas);
    expect(processesFinded).toContain(processGGGames);
  });
});
