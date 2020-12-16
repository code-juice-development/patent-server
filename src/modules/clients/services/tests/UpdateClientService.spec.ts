import AppError from '@shared/errors/AppError';

import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';

import CreateClientService from '@modules/clients/services/CreateClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';

let fakeClientsRepository: FakeClientsRepository;
let createClientService: CreateClientService;
let updateClientService: UpdateClientService;

describe('Update Client Service', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    createClientService = new CreateClientService(fakeClientsRepository);
    updateClientService = new UpdateClientService(fakeClientsRepository);
  });

  it('should be able to update a Client', async () => {
    const { id } = await createClientService.execute({
      name: 'JJ Multimarcas',
      email: 'jjmultimarcas@gmail.com',
      phone: '47995566320',
      cpf: '08576540230',
      cnpj: '95342393000128',
    });

    await updateClientService.execute({
      id,
      name: 'JJ Marcas',
      email: 'jjmarcas@gmail.com',
      phone: '47988554960',
      cpf: '08576540520',
      cnpj: '95342393000125',
    });

    const client = await fakeClientsRepository.findById(id);

    expect(client?.name).toBe('JJ Marcas');
    expect(client?.email).toBe('jjmarcas@gmail.com');
    expect(client?.phone).toBe('47988554960');
    expect(client?.cpf).toBe('08576540520');
    expect(client?.cnpj).toBe('95342393000125');
  });

  it('should not be able to update a Client with the same email of other Client', async () => {
    await createClientService.execute({
      name: 'GG Games',
      email: 'gggames@gmail.com',
      phone: '4788554960',
      cpf: '08576540123',
      cnpj: '95342393000120',
    });

    const { id } = await createClientService.execute({
      name: 'JJ Multimarcas',
      email: 'jjmultimarcas@gmail.com',
      phone: '47995566320',
      cpf: '08576540230',
      cnpj: '95342393000128',
    });

    expect(
      updateClientService.execute({
        id,
        name: 'JJ Multimarcas',
        email: 'gggames@gmail.com',
        phone: '47995566320',
        cpf: '08576540230',
        cnpj: '95342393000128',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a Client with the same phone of other Client', async () => {
    await createClientService.execute({
      name: 'GG Games',
      email: 'gggames@gmail.com',
      phone: '4788554960',
      cpf: '08576540123',
      cnpj: '95342393000120',
    });

    const { id } = await createClientService.execute({
      name: 'JJ Multimarcas',
      email: 'jjmultimarcas@gmail.com',
      phone: '47995566320',
      cpf: '08576540230',
      cnpj: '95342393000128',
    });

    expect(
      updateClientService.execute({
        id,
        name: 'JJ Multimarcas',
        email: 'jjmultimarcas@gmail.com',
        phone: '4788554960',
        cpf: '08576540230',
        cnpj: '95342393000128',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a Client with the same CPF of other Client', async () => {
    await createClientService.execute({
      name: 'GG Games',
      email: 'gggames@gmail.com',
      phone: '4788554960',
      cpf: '08576540123',
      cnpj: '95342393000120',
    });

    const { id } = await createClientService.execute({
      name: 'JJ Multimarcas',
      email: 'jjmultimarcas@gmail.com',
      phone: '47995566320',
      cpf: '08576540230',
      cnpj: '95342393000128',
    });

    expect(
      updateClientService.execute({
        id,
        name: 'JJ Multimarcas',
        email: 'jjmultimarcas@gmail.com',
        phone: '47995566320',
        cpf: '08576540123',
        cnpj: '95342393000128',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a Client with the same CNPJ of other Client', async () => {
    await createClientService.execute({
      name: 'GG Games',
      email: 'gggames@gmail.com',
      phone: '4788554960',
      cpf: '08576540123',
      cnpj: '95342393000120',
    });

    const { id } = await createClientService.execute({
      name: 'JJ Multimarcas',
      email: 'jjmultimarcas@gmail.com',
      phone: '47995566320',
      cpf: '08576540230',
      cnpj: '95342393000128',
    });

    expect(
      updateClientService.execute({
        id,
        name: 'JJ Multimarcas',
        email: 'jjmultimarcas@gmail.com',
        phone: '47995566320',
        cpf: '08576540230',
        cnpj: '95342393000120',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a Client without CPF or CNPJ', async () => {
    const { id } = await createClientService.execute({
      name: 'JJ Multimarcas',
      email: 'jjmultimarcas@gmail.com',
      phone: '47995566320',
      cpf: '08576540230',
      cnpj: '95342393000128',
    });

    expect(
      updateClientService.execute({
        id,
        name: 'JJ Multimarcas',
        email: 'jjmultimarcas@gmail.com',
        phone: '47995566320',
        cpf: '',
        cnpj: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
