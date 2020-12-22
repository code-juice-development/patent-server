import AppError from '@shared/errors/AppError';

import FakeProcessesRepository from '@modules/process/repositories/fakes/FakeProcessesRepository';

import CreateProcessService from '@modules/process/services/CreateProcessService';
import UpdateProcessService from '@modules/process/services/UpdateProcessService';

let fakeProcessRepository: FakeProcessesRepository;
let createProcessService: CreateProcessService;
let updateProcessService: UpdateProcessService;

describe('Update Process Service', () => {
  beforeEach(() => {
    fakeProcessRepository = new FakeProcessesRepository();
    createProcessService = new CreateProcessService(fakeProcessRepository);
    updateProcessService = new UpdateProcessService(fakeProcessRepository);
  });

  it('should be able to update a Process', async () => {
    const { id } = await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
    });

    await updateProcessService.execute({
      id,
      number: '156156',
      brand: 'GG Games',
      kind: 'Patentes',
      presentation: 'Visual',
      last_update: '15/01/2021',
      birthday: '15/01/2021',
      client_id: '6655',
    });

    const process = await fakeProcessRepository.findById(id);

    expect(process?.brand).toBe('GG Games');
    expect(process?.kind).toBe('Patentes');
    expect(process?.presentation).toBe('Visual');
    expect(process?.last_update).toBe('15/01/2021');
    expect(process?.birthday).toBe('15/01/2021');
    expect(process?.client_id).toBe('6655');
  });

  it('should not be able to update a Process with the same number', async () => {
    await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
    });

    const { id } = await createProcessService.execute({
      number: '151515',
      brand: 'GG Games',
      kind: 'Patentes',
      presentation: 'Visual',
      last_update: '15/01/2021',
      birthday: '15/01/2021',
      client_id: '6655',
    });

    expect(
      updateProcessService.execute({
        id,
        number: '156156',
        brand: 'GG Games',
        kind: 'Patentes',
        presentation: 'Visual',
        last_update: '15/01/2021',
        birthday: '15/01/2021',
        client_id: '6655',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a Process with the same brand', async () => {
    await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
    });

    const { id } = await createProcessService.execute({
      number: '151515',
      brand: 'GG Games',
      kind: 'Patentes',
      presentation: 'Visual',
      last_update: '15/01/2021',
      birthday: '15/01/2021',
      client_id: '6655',
    });

    expect(
      updateProcessService.execute({
        id,
        number: '151515',
        brand: 'JJ Multimarcas',
        kind: 'Patentes',
        presentation: 'Visual',
        last_update: '15/01/2021',
        birthday: '15/01/2021',
        client_id: '6655',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});