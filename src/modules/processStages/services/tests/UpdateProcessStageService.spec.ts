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

    await updateProcessStageService.execute({
      id,
      name: 'Concluído',
      code: 'C4558',
      description: 'Concluído o requerimento',
      deadline: '15',
      send_message: true,
      model_message: 'Oi, etapa Concluída',
      send_email: false,
      model_email: 'AAAA',
    });

    const processStage = await fakeProcessStagesRepository.findById(id);

    expect(processStage?.id).toBe(id);
    expect(processStage?.name).toBe('Concluído');
    expect(processStage?.code).toBe('C4558');
    expect(processStage?.description).toBe('Concluído o requerimento');
    expect(processStage?.deadline).toBe('15');
    expect(processStage?.send_message).toBe(true);
    expect(processStage?.model_message).toBe('Oi, etapa Concluída');
    expect(processStage?.send_email).toBe(false);
    expect(processStage?.model_email).toBe('AAAA');
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

    const { id } = await createProcessStageService.execute({
      name: 'Reavaliado',
      code: 'X550',
      description: '',
      deadline: '',
      send_message: false,
      model_message: '',
      send_email: false,
      model_email: '',
    });

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

    const { id } = await createProcessStageService.execute({
      name: 'Reavaliado',
      code: 'X560',
      description: '',
      deadline: '',
      send_message: false,
      model_message: '',
      send_email: false,
      model_email: '',
    });

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
