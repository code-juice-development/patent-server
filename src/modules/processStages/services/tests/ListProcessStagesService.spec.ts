import FakeProcessStagesRepository from '@modules/processStages/repositories/fakes/FakeProcessStagesRepository';

import CreateProcessStageService from '@modules/processStages/services/CreateProcessStageService';
import ListProcessStagesService from '@modules/processStages/services/ListProcessStagesService';

let fakeProcessStagesRepository: FakeProcessStagesRepository;
let createProcessStageService: CreateProcessStageService;
let listProcessStagesService: ListProcessStagesService;

describe('List Process Stages Service', () => {
  beforeEach(() => {
    fakeProcessStagesRepository = new FakeProcessStagesRepository();
    createProcessStageService = new CreateProcessStageService(
      fakeProcessStagesRepository,
    );
    listProcessStagesService = new ListProcessStagesService(
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
      send_message: true,
      model_message: 'Oi, etapa atualizada',
      send_email: false,
      model_email: '',
    });

    const findedProcessStages = await listProcessStagesService.execute();

    expect(findedProcessStages).toContain(processStageReavaliation);
    expect(findedProcessStages).toContain(processStageConcluded);
  });
});
