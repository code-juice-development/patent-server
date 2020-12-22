import FakeProcessStatusStagesRepository from '@modules/processStatusStages/repositories/fakes/FakeProcessStatusStagesRepository';

import CreateProcessStatusStageService from '@modules/processStatusStages/services/CreateProcessStatusStageService';
import UpdateProcessStatusStageService from '@modules/processStatusStages/services/UpdateProcessStatusStageService';

let fakeProcessStatusStagesRepository: FakeProcessStatusStagesRepository;
let createProcessStatusStageService: CreateProcessStatusStageService;
let updateProcessStatusStageService: UpdateProcessStatusStageService;

describe('Update Process Status Stage Service', () => {
  beforeEach(() => {
    fakeProcessStatusStagesRepository = new FakeProcessStatusStagesRepository();
    createProcessStatusStageService = new CreateProcessStatusStageService(
      fakeProcessStatusStagesRepository,
    );
    updateProcessStatusStageService = new UpdateProcessStatusStageService(
      fakeProcessStatusStagesRepository,
    );
  });

  it('should be able to update a Process Status Stage', async () => {
    const { id } = await createProcessStatusStageService.execute({
      has_pending: false,
      status_pending: 'Pendente pra vários dias',
      resolved_pending: false,
      process_id: '151515',
      process_stage_id: '151516',
    });

    await updateProcessStatusStageService.execute({
      id,
      has_pending: true,
      status_pending: 'Pendente pra vários anos',
      resolved_pending: true,
      process_id: '151516',
      process_stage_id: '151517',
    });

    const processStatusStage = await fakeProcessStatusStagesRepository.findById(
      id,
    );

    expect(processStatusStage?.has_pending).toBe(true);
    expect(processStatusStage?.status_pending).toBe('Pendente pra vários anos');
    expect(processStatusStage?.resolved_pending).toBe(true);
    expect(processStatusStage?.process_id).toBe('151516');
    expect(processStatusStage?.process_stage_id).toBe('151517');
  });
});
