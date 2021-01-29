import FakeDispatchsRepository from '@modules/dispatchs/repositories/fakes/FakeDispatchsRepository';

import CreateDispatchService from '@modules/dispatchs/services/CreateDispatchService';
import DeleteDispatchService from '@modules/dispatchs/services/DeleteDispatchService';

let fakeDispatchsRepository: FakeDispatchsRepository;
let createDispatchService: CreateDispatchService;
let deleteDispatchService: DeleteDispatchService;

describe('Delete Dispatch Service', () => {
  beforeEach(() => {
    fakeDispatchsRepository = new FakeDispatchsRepository();
    createDispatchService = new CreateDispatchService(fakeDispatchsRepository);
    deleteDispatchService = new DeleteDispatchService(fakeDispatchsRepository);
  });

  it('should be able to delete a Dispatch', async () => {
    const { id } = await createDispatchService.execute({
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

    await deleteDispatchService.execute({ id });

    const dispatch = await fakeDispatchsRepository.findById(id);

    expect(dispatch).toBeUndefined();
  });
});
