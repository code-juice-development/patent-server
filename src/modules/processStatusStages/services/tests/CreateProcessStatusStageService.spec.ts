import FakeProcessStatusStagesRepository from '@modules/processStatusStages/repositories/fakes/FakeProcessStatusStagesRepository';

import CreateProcessStatusStageService from '@modules/processStatusStages/services/CreateProcessStatusStageService';

let fakeProcessStatusStagesRepository: FakeProcessStatusStagesRepository;
let createProcessStatusStageService: CreateProcessStatusStageService;

describe('Create Process Status Stage Service', () => {
  beforeEach(() => {
    fakeProcessStatusStagesRepository = new FakeProcessStatusStagesRepository();
    createProcessStatusStageService = new CreateProcessStatusStageService(
      fakeProcessStatusStagesRepository,
    );
  });

  it('should be able to create a new Process Status Stage', async () => {
    const processStatusStage = await createProcessStatusStageService.execute({
      has_pending: true,
      status_pending: 'Pendente pra vários dias',
      resolved_pending: false,
      process_id: '151515',
      process_stage_id: '151516',
    });

    expect(processStatusStage).toHaveProperty('id');
  });
});
