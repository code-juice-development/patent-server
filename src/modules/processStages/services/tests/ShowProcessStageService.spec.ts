import AppError from '@shared/errors/AppError';

import FakeProcessStagesRepository from '@modules/processStages/repositories/fakes/FakeProcessStagesRepository';

import CreateProcessStageService from '@modules/processStages/services/CreateProcessStageService';
import ShowProcessStageService from '@modules/processStages/services/ShowProcessStageService';

let fakeProcessStagesRepository: FakeProcessStagesRepository;
let createProcessStageService: CreateProcessStageService;
let showProcessStageService: ShowProcessStageService;

describe('Show Process Stage Service', () => {
  beforeEach(() => {
    fakeProcessStagesRepository = new FakeProcessStagesRepository();
    createProcessStageService = new CreateProcessStageService(
      fakeProcessStagesRepository,
    );
    showProcessStageService = new ShowProcessStageService(
      fakeProcessStagesRepository,
    );
  });

  it('should be able to show a Process Stage', async () => {
    const processStage = await createProcessStageService.execute({
      name: 'Reavaliação',
      code: 'X4568',
      description: 'Reavaliar o requerimento pendente no protocolo',
      deadline: '15',
      send_message: true,
      model_message: 'Oi, etapa atualizada',
      send_email: false,
      model_email: '',
    });

    const { id } = processStage;

    const processStageFinded = await showProcessStageService.execute({
      id,
    });

    expect(processStage).toEqual(processStageFinded);
  });

  it('should not be able to show a inexistent Process Stage', async () => {
    expect(
      showProcessStageService.execute({
        id: 'nonexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
