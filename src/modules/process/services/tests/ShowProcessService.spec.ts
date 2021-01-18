import FakeProcessesRepository from '@modules/process/repositories/fakes/FakeProcessesRepository';
import FakeProcessStagesRepository from '@modules/processStages/repositories/fakes/FakeProcessStagesRepository';
import FakeProcessStatusStagesRepository from '@modules/processStatusStages/repositories/fakes/FakeProcessStatusStagesRepository';

import AppError from '@shared/errors/AppError';

import CreateProcessService from '@modules/process/services/CreateProcessService';
import ShowProcessService from '@modules/process/services/ShowProcessService';

let fakeProcessesRepository: FakeProcessesRepository;
let fakeProcessesStagesRepository: FakeProcessStagesRepository;
let fakeProcessesStatusStagesRepository: FakeProcessStatusStagesRepository;
let createProcessService: CreateProcessService;
let showProcessService: ShowProcessService;

describe('Show Process Service', () => {
  beforeEach(() => {
    fakeProcessesRepository = new FakeProcessesRepository();
    fakeProcessesStagesRepository = new FakeProcessStagesRepository();
    fakeProcessesStatusStagesRepository = new FakeProcessStatusStagesRepository();
    createProcessService = new CreateProcessService(
      fakeProcessesRepository,
      fakeProcessesStagesRepository,
      fakeProcessesStatusStagesRepository,
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
      client_id: '95342393000128',
      process_stage_id: '',
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
