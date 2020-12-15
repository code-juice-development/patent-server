import AppError from '@shared/errors/AppError';

import FakeProcessStagesRepository from '@modules/processStages/repositories/fakes/FakeProcessStagesRepository';

import CreateProcessStageService from '@modules/processStages/services/CreateProcessStageService';

let fakeProcessStagesRepository: FakeProcessStagesRepository;
let createProcessStageService: CreateProcessStageService;

describe('Create Process Stage Service', () => {
  beforeEach(() => {
    fakeProcessStagesRepository = new FakeProcessStagesRepository();
    createProcessStageService = new CreateProcessStageService(
      fakeProcessStagesRepository,
    );
  });

  it('should be able to create a new Process Stage', async () => {
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

    expect(processStage).toHaveProperty('id');
  });

  it('should not be able to create a new Process Stage with the same name', async () => {
    await createProcessStageService.execute({
      name: 'Reavaliação',
      code: '',
      description: '',
      deadline: '',
      send_message: false,
      model_message: '',
      send_email: false,
      model_email: '',
    });

    expect(
      createProcessStageService.execute({
        name: 'Reavaliação',
        code: '',
        description: '',
        deadline: '',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Process Stage with the same code', async () => {
    await createProcessStageService.execute({
      name: 'Reavaliação',
      code: 'X6050',
      description: '',
      deadline: '',
      send_message: false,
      model_message: '',
      send_email: false,
      model_email: '',
    });

    expect(
      createProcessStageService.execute({
        name: 'Reavaliado',
        code: 'X6050',
        description: '',
        deadline: '',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
