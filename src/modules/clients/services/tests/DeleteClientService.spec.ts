import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';

import CreateClientService from '@modules/clients/services/CreateClientService';
import DeleteClientService from '@modules/clients/services/DeleteClientService';

let fakeClientsRepository: FakeClientsRepository;
let createClientService: CreateClientService;
let deleteClientService: DeleteClientService;

describe('Delete Client Service', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    createClientService = new CreateClientService(fakeClientsRepository);
    deleteClientService = new DeleteClientService(fakeClientsRepository);
  });

  it('should be able to delete a Client', async () => {
    const { id } = await createClientService.execute({
      name: 'JJ Multimarcas',
      email: 'jjmultimarcas@gmail.com',
      phone: '47995566320',
      cpf: '67271104097',
      cnpj: '77646014000101',
    });

    await deleteClientService.execute({ id });

    const client = await fakeClientsRepository.findById(id);

    expect(client).toBeUndefined();
  });
});
