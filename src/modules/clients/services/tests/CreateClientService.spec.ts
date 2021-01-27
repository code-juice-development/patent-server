import AppError from '@shared/errors/AppError';

import FakeClientsRepository from '@modules/clients/repositories/fakes/FakeClientsRepository';

import CreateClientService from '@modules/clients/services/CreateClientService';

let fakeClientsRepository: FakeClientsRepository;
let createClientService: CreateClientService;

describe('Create Client Service', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    createClientService = new CreateClientService(fakeClientsRepository);
  });

  it('should be able to create a new Client', async () => {
    const client = await createClientService.execute({
      name: 'JJ Multimarcas',
      email: 'jjmultimarcas@gmail.com',
      phone: '47995566320',
      cpf: '',
      cnpj: '52850101000155',
    });

    expect(client).toHaveProperty('id');
  });

  it('should not be able to create a new Client with the same email', async () => {
    await createClientService.execute({
      name: 'JJ Multimarcas',
      email: 'jjmultimarcas@gmail.com',
      phone: '47995566320',
      cpf: '',
      cnpj: '77646014000101',
    });

    expect(
      createClientService.execute({
        name: 'JJ Marcas',
        email: 'jjmultimarcas@gmail.com',
        phone: '47988554960',
        cpf: '',
        cnpj: '52850101000155',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Client with the same phone', async () => {
    await createClientService.execute({
      name: 'JJ Multimarcas',
      email: 'jjmultimarcas@gmail.com',
      phone: '47995566320',
      cpf: '',
      cnpj: '77646014000101',
    });

    expect(
      createClientService.execute({
        name: 'JJ Marcas',
        email: 'jjmarcas@gmail.com',
        phone: '47995566320',
        cpf: '',
        cnpj: '52850101000155',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Client with the same CPF', async () => {
    await createClientService.execute({
      name: 'JJ Multimarcas',
      email: 'jjmultimarcas@gmail.com',
      phone: '47995566320',
      cpf: '67271104097',
      cnpj: '',
    });

    expect(
      createClientService.execute({
        name: 'JJ Marcas',
        email: 'jjmarcas@gmail.com',
        phone: '47995566851',
        cpf: '67271104097',
        cnpj: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Client with the same CNPJ', async () => {
    await createClientService.execute({
      name: 'JJ Multimarcas',
      email: 'jjmultimarcas@gmail.com',
      phone: '47995566320',
      cpf: '',
      cnpj: '77646014000101',
    });

    expect(
      createClientService.execute({
        name: 'JJ Marcas',
        email: 'jjmarcas@gmail.com',
        phone: '47995566851',
        cpf: '',
        cnpj: '77646014000101',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Client without CNPJ and CPF', async () => {
    expect(
      createClientService.execute({
        name: 'JJ Marcas',
        email: 'jjmarcas@gmail.com',
        phone: '47995566851',
        cpf: '',
        cnpj: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Client with wrong CPF', async () => {
    expect(
      createClientService.execute({
        name: 'JJ Marcas',
        email: 'jjmarcas@gmail.com',
        phone: '47995566851',
        cpf: '67271104095',
        cnpj: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Client with wrong CNPJ', async () => {
    expect(
      createClientService.execute({
        name: 'JJ Marcas',
        email: 'jjmarcas@gmail.com',
        phone: '47995566851',
        cpf: '',
        cnpj: '77646014000102',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
