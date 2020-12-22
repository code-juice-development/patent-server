import FakeProcessStatusStagesRepository from '@modules/processStatusStages/repositories/fakes/FakeProcessStatusStagesRepository';

import CreateProcessStatusStageService from '@modules/processStatusStages/services/CreateProcessStatusStageService';
import ListProcessStatusStagesService from '@modules/processStatusStages/services/ListProcessStatusStagesService';

let fakeProcessStatusStagesRepository: FakeProcessStatusStagesRepository;
let createProcessStatusStageService: CreateProcessStatusStageService;
let listProcessStatusStagesService: ListProcessStatusStagesService;

describe('List Process Status Stages Service', () => {
  beforeEach(() => {
    fakeProcessStatusStagesRepository = new FakeProcessStatusStagesRepository();
    createProcessStatusStageService = new CreateProcessStatusStageService(
      fakeProcessStatusStagesRepository,
    );
    listProcessStatusStagesService = new ListProcessStatusStagesService(
      fakeProcessStatusStagesRepository,
    );
  });

  it('should be able to list all Process Status Stages', async () => {
    const resolvedPending = await createProcessStatusStageService.execute({
      has_pending: true,
      status_pending: 'Pendente pra vários dias',
      resolved_pending: true,
      process_id: '151516',
      process_stage_id: '151517',
    });

    const unresolvedPending = await createProcessStatusStageService.execute({
      has_pending: true,
      status_pending: 'Pendente pra vários dias',
      resolved_pending: false,
      process_id: '151515',
      process_stage_id: '151516',
    });

    const processesFinded = await listProcessStatusStagesService.execute();

    expect(processesFinded).toContain(resolvedPending);
    expect(processesFinded).toContain(unresolvedPending);
  });
});
