import FakeProcessStatusStagesRepository from '@modules/processStatusStages/repositories/fakes/FakeProcessStatusStagesRepository';

import CreateProcessStatusStageService from '@modules/processStatusStages/services/CreateProcessStatusStageService';
import ListProcessStatusStagesIndexedService from '@modules/processStatusStages/services/ListProcessStatusStagesIndexedService';

let fakeProcessStatusStagesRepository: FakeProcessStatusStagesRepository;
let createProcessStatusStageService: CreateProcessStatusStageService;
let listProcessStatusStagesIndexedService: ListProcessStatusStagesIndexedService;

describe('List Process Status Stages Indexed Service', () => {
  beforeEach(() => {
    fakeProcessStatusStagesRepository = new FakeProcessStatusStagesRepository();
    createProcessStatusStageService = new CreateProcessStatusStageService(
      fakeProcessStatusStagesRepository,
    );
    listProcessStatusStagesIndexedService = new ListProcessStatusStagesIndexedService(
      fakeProcessStatusStagesRepository,
    );
  });

  it('should be able to list a Process Status Stages', async () => {
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

    const responseResolvedPending = await listProcessStatusStagesIndexedService.execute(
      {
        page: 0,
        rows: 10,
        ordenation: '',
        has_pending: true,
        resolved_pending: true,
        process_id: null,
        process_stage_id: null,
      },
    );

    const responseUnresolvedPending = await listProcessStatusStagesIndexedService.execute(
      {
        page: 0,
        rows: 10,
        ordenation: '',
        has_pending: true,
        resolved_pending: false,
        process_id: null,
        process_stage_id: null,
      },
    );

    // Count
    expect(responseUnresolvedPending.total).toEqual(2);

    // Resolved
    expect(responseResolvedPending.process_status_stages).toContain(
      resolvedPending,
    );
    expect(responseResolvedPending.process_status_stages).not.toContain(
      unresolvedPending,
    );

    // Unresolved
    expect(responseUnresolvedPending.process_status_stages).toContain(
      unresolvedPending,
    );
    expect(responseUnresolvedPending.process_status_stages).not.toContain(
      resolvedPending,
    );
  });
});
