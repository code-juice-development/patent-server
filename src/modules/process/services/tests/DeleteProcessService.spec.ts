import FakeProcessesRepository from '@modules/process/repositories/fakes/FakeProcessesRepository';
import FakeProcessStagesRepository from '@modules/processStages/repositories/fakes/FakeProcessStagesRepository';
import FakeProcessStatusStagesRepository from '@modules/processStatusStages/repositories/fakes/FakeProcessStatusStagesRepository';

import CreateProcessService from '@modules/process/services/CreateProcessService';
import DeleteProcessService from '@modules/process/services/DeleteProcessService';

let fakeProcessesRepository: FakeProcessesRepository;
let fakeProcessesStagesRepository: FakeProcessStagesRepository;
let fakeProcessesStatusStagesRepository: FakeProcessStatusStagesRepository;
let createProcessService: CreateProcessService;
let deleteProcessService: DeleteProcessService;

describe('Delete Process Service', () => {
  beforeEach(() => {
    fakeProcessesRepository = new FakeProcessesRepository();
    fakeProcessesStagesRepository = new FakeProcessStagesRepository();
    fakeProcessesStatusStagesRepository = new FakeProcessStatusStagesRepository();
    createProcessService = new CreateProcessService(
      fakeProcessesRepository,
      fakeProcessesStagesRepository,
      fakeProcessesStatusStagesRepository,
    );
    deleteProcessService = new DeleteProcessService(fakeProcessesRepository);
  });

  it('should be able to delete Process', async () => {
    const { id } = await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
      process_stage_id: '',
    });

    await deleteProcessService.execute({ id });

    const process = await fakeProcessesRepository.findById(id);

    expect(process).toBeUndefined();
  });
});
