import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';

import CreateClientService from '@modules/clients/services/CreateClientService';
import ListClientsService from '@modules/clients/services/ListClientsService';

let fakeClientsRepository: FakeClientsRepository;
let createClientService: CreateClientService;
let listClientsService: ListClientsService;

describe('List Clients Service', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    createClientService = new CreateClientService(fakeClientsRepository);
    listClientsService = new ListClientsService(fakeClientsRepository);
  });

  it('should be able to list all Clients', async () => {
    const clientJJMultimarcas = await createClientService.execute({
      name: 'JJ Multimarcas',
      email: 'jjmultimarcas@gmail.com',
      phone: '47995566320',
      cpf: '67271104097',
      cnpj: '77646014000101',
    });

    const clientGGGames = await createClientService.execute({
      name: 'GG Games',
      email: 'gggames@gmail.com',
      phone: '4788554960',
      cpf: '90496093096',
      cnpj: '52850101000155',
    });

    const clientsFinded = await listClientsService.execute();

    expect(clientsFinded).toContain(clientJJMultimarcas);
    expect(clientsFinded).toContain(clientGGGames);
  });
});
