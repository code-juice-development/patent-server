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
      cpf: '08576540230',
      cnpj: '95342393000128',
    });

    const clientGGGames = await createClientService.execute({
      name: 'GG Games',
      email: 'gggames@gmail.com',
      phone: '4788554960',
      cpf: '08576540123',
      cnpj: '95342393000120',
    });

    const clientsFinded = await listClientsService.execute();

    expect(clientsFinded).toContain(clientJJMultimarcas);
    expect(clientsFinded).toContain(clientGGGames);
  });
});
