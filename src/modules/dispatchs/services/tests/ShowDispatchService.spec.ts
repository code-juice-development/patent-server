import AppError from '@shared/errors/AppError';

import FakeDispatchsRepository from '@modules/dispatchs/repositories/fakes/FakeDispatchsRepository';

import CreateDispatchService from '@modules/dispatchs/services/CreateDispatchService';
import ShowDispatchService from '@modules/dispatchs/services/ShowDispatchService';

let fakeDispatchsRepository: FakeDispatchsRepository;
let createDispatchService: CreateDispatchService;
let showDispatchService: ShowDispatchService;

describe('Show Dispatch Service', () => {
  beforeEach(() => {
    fakeDispatchsRepository = new FakeDispatchsRepository();
    createDispatchService = new CreateDispatchService(fakeDispatchsRepository);
    showDispatchService = new ShowDispatchService(fakeDispatchsRepository);
  });

  it('should be able to show a Dispatch', async () => {
    const dispatch = await createDispatchService.execute({
      name: 'Reavaliação',
      code: 'X4568',
      description: 'Reavaliar o requerimento pendente no protocolo',
      deadline: 15,
      send_message: true,
      model_message: 'Oi, etapa atualizada',
      send_email: false,
      model_email: '',
      after_sale: null,
    });

    const { id } = dispatch;

    const dispatchFinded = await showDispatchService.execute({
      id,
    });

    expect(dispatch).toEqual(dispatchFinded);
  });

  it('should not be able to show a inexistent Dispatch', async () => {
    expect(
      showDispatchService.execute({
        id: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
