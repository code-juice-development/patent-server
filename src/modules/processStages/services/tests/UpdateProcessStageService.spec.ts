import AppError from '@shared/errors/AppError';

import FakeProcessStagesRepository from '@modules/processStages/repositories/fakes/FakeProcessStagesRepository';

import CreateProcessStageService from '@modules/processStages/services/CreateProcessStageService';
import UpdateProcessStageService from '@modules/processStages/services/UpdateProcessStageService';

let fakeProcessStagesRepository: FakeProcessStagesRepository;
let createProcessStageService: CreateProcessStageService;
let updateProcessStageService: UpdateProcessStageService;

describe('Update Process Stage Service', () => {
  beforeEach(() => {
    fakeProcessStagesRepository = new FakeProcessStagesRepository();
    createProcessStageService = new CreateProcessStageService(
      fakeProcessStagesRepository,
    );
    updateProcessStageService = new UpdateProcessStageService(
      fakeProcessStagesRepository,
    );
  });

  it('should be able to update a Process Stages', async () => {
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

    await updateProcessStageService.execute({
      id,
      name: 'Concluído',
      code: 'C4558',
      description: 'Concluído o requerimento pendente no protocolo',
      deadline: '15',
      send_message: true,
      model_message: 'Oi, etapa Concluída',
      send_email: false,
      model_email: 'AAAA',
    });

    const processStageFinded = await fakeProcessStagesRepository.findById(id);

    expect(processStageFinded?.id).toBe(id);
    expect(processStageFinded?.name).toBe('Concluído');
    expect(processStageFinded?.code).toBe('C4558');
    expect(processStageFinded?.description).toBe(
      'Concluído o requerimento pendente no protocolo',
    );
    expect(processStageFinded?.deadline).toBe('15');
    expect(processStageFinded?.send_message).toBe(true);
    expect(processStageFinded?.model_message).toBe('Oi, etapa Concluída');
    expect(processStageFinded?.send_email).toBe(false);
    expect(processStageFinded?.model_email).toBe('AAAA');
  });

  it('should not be able to update a Process Stage with the same name', async () => {
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

    const processStage = await createProcessStageService.execute({
      name: 'Reavaliado',
      code: 'X550',
      description: '',
      deadline: '',
      send_message: false,
      model_message: '',
      send_email: false,
      model_email: '',
    });

    const { id } = processStage;

    expect(
      updateProcessStageService.execute({
        id,
        name: 'Reavaliação',
        code: 'X560',
        description: '',
        deadline: '',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update Process Stage with the same code', async () => {
    await createProcessStageService.execute({
      name: 'Reavaliação',
      code: 'X550',
      description: '',
      deadline: '',
      send_message: false,
      model_message: '',
      send_email: false,
      model_email: '',
    });

    const processStage = await createProcessStageService.execute({
      name: 'Reavaliado',
      code: 'X560',
      description: '',
      deadline: '',
      send_message: false,
      model_message: '',
      send_email: false,
      model_email: '',
    });

    const { id } = processStage;

    expect(
      updateProcessStageService.execute({
        id,
        name: 'Reavaliado',
        code: 'X550',
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
