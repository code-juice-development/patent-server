import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';

import CreateClientService from '@modules/clients/services/CreateClientService';
import ListClientsIndexedService from '@modules/clients/services/ListClientsIndexedService';

let fakeClientsRepository: FakeClientsRepository;
let createClientService: CreateClientService;
let listClientsIndexedService: ListClientsIndexedService;

describe('List Clients Indexed Service', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    createClientService = new CreateClientService(fakeClientsRepository);
    listClientsIndexedService = new ListClientsIndexedService(
      fakeClientsRepository,
    );
  });

  it('should be able to list a Clients', async () => {
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

    const responseClientsJJMultimarcas = await listClientsIndexedService.execute(
      {
        page: 0,
        rows: 10,
        ordenation: '',
        name: 'JJ Multimarcas',
        email: null,
        phone: null,
        cpf: null,
        cnpj: null,
      },
    );

    const responseClientsGGGames = await listClientsIndexedService.execute({
      page: 0,
      rows: 10,
      ordenation: '',
      name: 'GG Games',
      email: null,
      phone: null,
      cpf: null,
      cnpj: null,
    });

    // Count
    expect(responseClientsGGGames.total).toEqual(2);

    // JJ Multimarcas
    expect(responseClientsJJMultimarcas.clients).toContain(clientJJMultimarcas);
    expect(responseClientsJJMultimarcas.clients).not.toContain(clientGGGames);

    // GG Marcas
    expect(responseClientsGGGames.clients).toContain(clientGGGames);
    expect(responseClientsGGGames.clients).not.toContain(clientJJMultimarcas);
  });
});
