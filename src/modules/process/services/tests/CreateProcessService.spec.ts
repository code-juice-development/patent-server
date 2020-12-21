import AppError from '@shared/errors/AppError';

import FakeProcessesRepository from '@modules/process/repositories/fakes/FakeProcessesRepository';

import CreateProcessService from '@modules/process/services/CreateProcessService';

let fakeProcessRepository: FakeProcessesRepository;
let createProcessService: CreateProcessService;

describe('Create Process Service', () => {
  beforeEach(() => {
    fakeProcessRepository = new FakeProcessesRepository();
    createProcessService = new CreateProcessService(fakeProcessRepository);
  });

  it('should be able to create a new Process', async () => {
    const process = await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
    });

    expect(process).toHaveProperty('id');
  });

  it('should not be able to create a new Process with the same number', async () => {
    await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
    });

    expect(
      createProcessService.execute({
        number: '156156',
        brand: 'GG Games',
        kind: 'Marcas e Patentes',
        presentation: 'Visual',
        last_update: '01/01/2021',
        birthday: '01/01/2021',
        client_id: '95342393000128',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new Process with the same brand', async () => {
    await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
    });

    expect(
      createProcessService.execute({
        number: '151515',
        brand: 'JJ Multimarcas',
        kind: 'Marcas e Patentes',
        presentation: 'Visual',
        last_update: '01/01/2021',
        birthday: '01/01/2021',
        client_id: '95342393000128',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
