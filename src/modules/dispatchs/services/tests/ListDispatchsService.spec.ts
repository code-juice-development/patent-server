import FakeDispatchsRepository from '@modules/dispatchs/repositories/fakes/FakeDispatchsRepository';

import CreateDispatchService from '@modules/dispatchs/services/CreateDispatchService';
import ListDispatchsService from '@modules/dispatchs/services/ListDispatchsService';

let fakeDispatchsRepository: FakeDispatchsRepository;
let createDispatchService: CreateDispatchService;
let listDispatchsService: ListDispatchsService;

describe('List Dispatchs Service', () => {
  beforeEach(() => {
    fakeDispatchsRepository = new FakeDispatchsRepository();
    createDispatchService = new CreateDispatchService(fakeDispatchsRepository);
    listDispatchsService = new ListDispatchsService(fakeDispatchsRepository);
  });

  it('should be able to list all Dispatchs', async () => {
    const dispatchReavaliation = await createDispatchService.execute({
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

    const dispatchConcluded = await createDispatchService.execute({
      name: 'Concluído',
      code: 'C4558',
      description: 'Concluído o requerimento pendente no protocolo',
      deadline: 15,
      send_message: true,
      model_message: 'Oi, etapa atualizada',
      send_email: false,
      model_email: '',
      after_sale: null,
    });

    const findedDispatchs = await listDispatchsService.execute();

    expect(findedDispatchs).toContain(dispatchReavaliation);
    expect(findedDispatchs).toContain(dispatchConcluded);
  });
});
