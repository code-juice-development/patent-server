import AppError from '@shared/errors/AppError';

import FakeDispatchsRepository from '@modules/dispatchs/repositories/fakes/FakeDispatchsRepository';

import CreateDispatchService from '@modules/dispatchs/services/CreateDispatchService';

let fakeDispatchsRepository: FakeDispatchsRepository;
let createDispatchService: CreateDispatchService;

describe('Create Dispatch Service', () => {
  beforeEach(() => {
    fakeDispatchsRepository = new FakeDispatchsRepository();
    createDispatchService = new CreateDispatchService(fakeDispatchsRepository);
  });

  it('should be able to create a new Dispatch', async () => {
    const dispatch = await createDispatchService.execute({
      name: 'Reavaliação',
      code: 'X4568',
      description: 'Reavaliar o requerimento pendente no protocolo',
      deadline: 15,
      send_message: true,
      model_message: 'Oi, etapa atualizada',
      send_email: false,
      model_email: '',
      after_sale: 15,
    });

    expect(dispatch).toHaveProperty('id');
  });

  it('should not be able to create a new Dispatch with the same name', async () => {
    await createDispatchService.execute({
      name: 'Reavaliação',
      code: '',
      description: '',
      deadline: null,
      send_message: false,
      model_message: '',
      send_email: false,
      model_email: '',
      after_sale: null,
    });

    expect(
      createDispatchService.execute({
        name: 'Reavaliação',
        code: '',
        description: '',
        deadline: null,
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
        after_sale: null,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Dispatch with the same code', async () => {
    await createDispatchService.execute({
      name: 'Reavaliação',
      code: 'X6050',
      description: '',
      deadline: null,
      send_message: false,
      model_message: '',
      send_email: false,
      model_email: '',
      after_sale: null,
    });

    expect(
      createDispatchService.execute({
        name: 'Reavaliado',
        code: 'X6050',
        description: '',
        deadline: null,
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
        after_sale: null,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
