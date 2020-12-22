import FakeProcessStagesRepository from '@modules/processStages/repositories/fakes/FakeProcessStagesRepository';

import CreateProcessStageService from '@modules/processStages/services/CreateProcessStageService';
import ListProcessStagesIndexedService from '@modules/processStages/services/ListProcessStagesIndexedService';

let fakeProcessStagesRepository: FakeProcessStagesRepository;
let createProcessStageService: CreateProcessStageService;
let listProcessStagesIndexedService: ListProcessStagesIndexedService;

describe('List Process Stages Indexed Service', () => {
  beforeEach(() => {
    fakeProcessStagesRepository = new FakeProcessStagesRepository();
    createProcessStageService = new CreateProcessStageService(
      fakeProcessStagesRepository,
    );
    listProcessStagesIndexedService = new ListProcessStagesIndexedService(
      fakeProcessStagesRepository,
    );
  });

  it('should be able to list a Process Stages', async () => {
    const processStageReavaliation = await createProcessStageService.execute({
      name: 'Reavaliação',
      code: 'X4568',
      description: 'Reavaliar o requerimento pendente no protocolo',
      deadline: '15',
      send_message: true,
      model_message: 'Oi, etapa atualizada',
      send_email: false,
      model_email: '',
    });

    const processStageConcluded = await createProcessStageService.execute({
      name: 'Concluído',
      code: 'C4558',
      description: 'Concluído o requerimento pendente no protocolo',
      deadline: '15',
      send_message: false,
      model_message: 'Oi, etapa atualizada',
      send_email: true,
      model_email: '',
    });

    const responseProcessStageReavaliation = await listProcessStagesIndexedService.execute(
      {
        page: 0,
        rows: 10,
        ordenation: '',
        name: 'Reavaliação',
        code: null,
        description: null,
        deadline: null,
        send_message: true,
        send_email: null,
      },
    );

    const responseProcessStageConcluded = await listProcessStagesIndexedService.execute(
      {
        page: 0,
        rows: 10,
        ordenation: '',
        name: null,
        code: null,
        description: null,
        deadline: null,
        send_message: null,
        send_email: true,
      },
    );

    // Count
    expect(responseProcessStageReavaliation.total).toEqual(2);

    // Reavaliation
    expect(responseProcessStageReavaliation.processStages).toContain(
      processStageReavaliation,
    );
    expect(responseProcessStageReavaliation.processStages).not.toContain(
      processStageConcluded,
    );

    // Concluded
    expect(responseProcessStageConcluded.processStages).toContain(
      processStageConcluded,
    );
    expect(responseProcessStageConcluded.processStages).not.toContain(
      processStageReavaliation,
    );
  });
});
