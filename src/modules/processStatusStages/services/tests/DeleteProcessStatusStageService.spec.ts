import FakeProcessStatusStagesRepository from '@modules/processStatusStages/repositories/fakes/FakeProcessStatusStagesRepository';

import CreateProcessStatusStageService from '@modules/processStatusStages/services/CreateProcessStatusStageService';
import DeleteProcessStatusStageService from '@modules/processStatusStages/services/DeleteProcessStatusStageService';

let fakeProcessStatusStagesRepository: FakeProcessStatusStagesRepository;
let createProcessStatusStageService: CreateProcessStatusStageService;
let deleteProcessStatusStageService: DeleteProcessStatusStageService;

describe('Delete Process Status Stage Service', () => {
  beforeEach(() => {
    fakeProcessStatusStagesRepository = new FakeProcessStatusStagesRepository();
    createProcessStatusStageService = new CreateProcessStatusStageService(
      fakeProcessStatusStagesRepository,
    );
    deleteProcessStatusStageService = new DeleteProcessStatusStageService(
      fakeProcessStatusStagesRepository,
    );
  });

  it('should be able to create a new Process', async () => {
    const { id } = await createProcessStatusStageService.execute({
      has_pending: true,
      status_pending: 'Pendente pra vários dias',
      resolved_pending: false,
      process_id: '151515',
      process_stage_id: '151516',
    });

    await deleteProcessStatusStageService.execute({ id });

    const processStatusStage = await fakeProcessStatusStagesRepository.findById(
      id,
    );

    expect(processStatusStage).toBeUndefined();
  });
});
