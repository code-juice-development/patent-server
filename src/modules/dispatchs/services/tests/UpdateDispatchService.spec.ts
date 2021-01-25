import AppError from '@shared/errors/AppError';

import FakeDispatchsRepository from '@modules/dispatchs/repositories/fakes/FakeDispatchsRepository';

import CreateDispatchService from '@modules/dispatchs/services/CreateDispatchService';
import UpdateDispatchService from '@modules/dispatchs/services/UpdateDispatchService';

let fakeDispatchsRepository: FakeDispatchsRepository;
let createDispatchService: CreateDispatchService;
let updateDispatchService: UpdateDispatchService;

describe('Update Dispatch Service', () => {
  beforeEach(() => {
    fakeDispatchsRepository = new FakeDispatchsRepository();
    createDispatchService = new CreateDispatchService(fakeDispatchsRepository);
    updateDispatchService = new UpdateDispatchService(fakeDispatchsRepository);
  });

  it('should be able to update a Dispatch', async () => {
    const { id } = await createDispatchService.execute({
      name: 'Reavaliação',
      code: 'X4568',
      description: 'Reavaliar o requerimento pendente no protocolo',
      deadline: '15',
      send_message: true,
      model_message: 'Oi, etapa atualizada',
      send_email: false,
      model_email: '',
    });

    await updateDispatchService.execute({
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

    const dispatch = await fakeDispatchsRepository.findById(id);

    expect(dispatch?.id).toBe(id);
    expect(dispatch?.name).toBe('Concluído');
    expect(dispatch?.code).toBe('C4558');
    expect(dispatch?.description).toBe('Concluído o requerimento');
    expect(dispatch?.deadline).toBe('15');
    expect(dispatch?.send_message).toBe(true);
    expect(dispatch?.model_message).toBe('Oi, etapa Concluída');
    expect(dispatch?.send_email).toBe(false);
    expect(dispatch?.model_email).toBe('AAAA');
  });

  it('should not be able to update a Dispatch with the same name', async () => {
    await createDispatchService.execute({
      name: 'Reavaliação',
      code: '',
      description: '',
      deadline: '',
      send_message: false,
      model_message: '',
      send_email: false,
      model_email: '',
    });

    const { id } = await createDispatchService.execute({
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
      updateDispatchService.execute({
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

  it('should not be able to update Dispatch with the same code', async () => {
    await createDispatchService.execute({
      name: 'Reavaliação',
      code: 'X550',
      description: '',
      deadline: '',
      send_message: false,
      model_message: '',
      send_email: false,
      model_email: '',
    });

    const { id } = await createDispatchService.execute({
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
      updateDispatchService.execute({
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
