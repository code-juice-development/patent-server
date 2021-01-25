import FakeDispatchsRepository from '@modules/dispatchs/repositories/fakes/FakeDispatchsRepository';

import CreateDispatchService from '@modules/dispatchs/services/CreateDispatchService';
import ListDispatchsIndexedService from '@modules/dispatchs/services/ListDispatchsIndexedService';

let fakeDispatchsRepository: FakeDispatchsRepository;
let createDispatchService: CreateDispatchService;
let listDispatchsIndexedService: ListDispatchsIndexedService;

describe('List Dispatchs Indexed Service', () => {
  beforeEach(() => {
    fakeDispatchsRepository = new FakeDispatchsRepository();
    createDispatchService = new CreateDispatchService(fakeDispatchsRepository);
    listDispatchsIndexedService = new ListDispatchsIndexedService(
      fakeDispatchsRepository,
    );
  });

  it('should be able to list a Dispatchs', async () => {
    const dispatchReavaliation = await createDispatchService.execute({
      name: 'Reavaliação',
      code: 'X4568',
      description: 'Reavaliar o requerimento pendente no protocolo',
      deadline: '15',
      send_message: true,
      model_message: 'Oi, etapa atualizada',
      send_email: false,
      model_email: '',
    });

    const dispatchConcluded = await createDispatchService.execute({
      name: 'Concluído',
      code: 'C4558',
      description: 'Concluído o requerimento pendente no protocolo',
      deadline: '15',
      send_message: false,
      model_message: 'Oi, etapa atualizada',
      send_email: true,
      model_email: '',
    });

    const responseDispatchReavaliation = await listDispatchsIndexedService.execute(
      {
        page: 0,
        rows: 10,
        ordenation: '',
        name: 'Reavaliação',
        code: null,
        description: null,
        deadline: null,
        send_message: true,
        send_email: null,
      },
    );

    const responseDispatchConcluded = await listDispatchsIndexedService.execute(
      {
        page: 0,
        rows: 10,
        ordenation: '',
        name: null,
        code: null,
        description: null,
        deadline: null,
        send_message: null,
        send_email: true,
      },
    );

    // Count
    expect(responseDispatchReavaliation.total).toEqual(2);

    // Reavaliation
    expect(responseDispatchReavaliation.dispatchs).toContain(
      dispatchReavaliation,
    );
    expect(responseDispatchReavaliation.dispatchs).not.toContain(
      dispatchConcluded,
    );

    // Concluded
    expect(responseDispatchConcluded.dispatchs).toContain(dispatchConcluded);
    expect(responseDispatchConcluded.dispatchs).not.toContain(
      dispatchReavaliation,
    );
  });
});
