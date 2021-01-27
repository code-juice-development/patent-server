import AppError from '@shared/errors/AppError';

import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';

import CreateClientService from '@modules/clients/services/CreateClientService';
import ShowClientService from '@modules/clients/services/ShowClientService';

let fakeClientsRepository: FakeClientsRepository;
let createClientService: CreateClientService;
let showClientService: ShowClientService;

describe('Show Client Service', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    createClientService = new CreateClientService(fakeClientsRepository);
    showClientService = new ShowClientService(fakeClientsRepository);
  });

  it('should be able to show a Client', async () => {
    const client = await createClientService.execute({
      name: 'JJ Multimarcas',
      email: 'jjmultimarcas@gmail.com',
      phone: '47995566320',
      cpf: '67271104097',
      cnpj: '77646014000101',
    });

    const { id } = client;

    const clientFinded = await showClientService.execute({ id });

    expect(client).toEqual(clientFinded);
  });

  it('should not be able to show a inexistent Client', async () => {
    expect(
      showClientService.execute({
        id: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
