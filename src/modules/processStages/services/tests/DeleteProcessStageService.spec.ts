import FakeProcessStagesRepository from '@modules/processStages/repositories/fakes/FakeProcessStagesRepository';

import CreateProcessStageService from '@modules/processStages/services/CreateProcessStageService';
import DeleteProcessStageService from '@modules/processStages/services/DeleteProcessStageService';

let fakeProcessStagesRepository: FakeProcessStagesRepository;
let createProcessStageService: CreateProcessStageService;
let deleteProcessStageService: DeleteProcessStageService;

describe('Delete Process Stage Service', () => {
  beforeEach(() => {
    fakeProcessStagesRepository = new FakeProcessStagesRepository();
    createProcessStageService = new CreateProcessStageService(
      fakeProcessStagesRepository,
    );
    deleteProcessStageService = new DeleteProcessStageService(
      fakeProcessStagesRepository,
    );
  });

  it('should be able to delete a Process Stage', async () => {
    const { id } = await createProcessStageService.execute({
      name: 'Reavaliação',
      code: 'X4568',
      description: 'Reavaliar o requerimento pendente no protocolo',
      deadline: '15',
      send_message: true,
      model_message: 'Oi, etapa atualizada',
      send_email: false,
      model_email: '',
    });

    await deleteProcessStageService.execute({ id });

    const processStage = await fakeProcessStagesRepository.findById(id);

    expect(processStage).toBeUndefined();
  });
});
