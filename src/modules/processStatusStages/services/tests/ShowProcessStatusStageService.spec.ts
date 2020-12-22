import FakeProcessStatusStagesRepository from '@modules/processStatusStages/repositories/fakes/FakeProcessStatusStagesRepository';

import AppError from '@shared/errors/AppError';

import CreateProcessStatusStageService from '@modules/processStatusStages/services/CreateProcessStatusStageService';
import ShowProcessStatusStageService from '@modules/processStatusStages/services/ShowProcessStatusStageService';

let fakeProcessStatusStagesRepository: FakeProcessStatusStagesRepository;
let createProcessStatusStageService: CreateProcessStatusStageService;
let showProcessStatusStageService: ShowProcessStatusStageService;

describe('Show Process Status Stage Service', () => {
  beforeEach(() => {
    fakeProcessStatusStagesRepository = new FakeProcessStatusStagesRepository();
    createProcessStatusStageService = new CreateProcessStatusStageService(
      fakeProcessStatusStagesRepository,
    );
    showProcessStatusStageService = new ShowProcessStatusStageService(
      fakeProcessStatusStagesRepository,
    );
  });

  it('should be able to show a Process Status Stage', async () => {
    const processStatusStage = await createProcessStatusStageService.execute({
      has_pending: true,
      status_pending: 'Pendente pra vários dias',
      resolved_pending: true,
      process_id: '151516',
      process_stage_id: '151517',
    });

    const { id } = processStatusStage;

    const processStatusStageFinded = await showProcessStatusStageService.execute(
      { id },
    );

    expect(processStatusStage).toEqual(processStatusStageFinded);
  });

  it('should not be able to show a inexistent Process', async () => {
    expect(
      showProcessStatusStageService.execute({
        id: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
