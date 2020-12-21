import FakeProcessesRepository from '@modules/process/repositories/fakes/FakeProcessesRepository';

import AppError from '@shared/errors/AppError';

import CreateProcessService from '@modules/process/services/CreateProcessService';
import ShowProcessService from '@modules/process/services/ShowProcessService';

let fakeProcessRepository: FakeProcessesRepository;
let createProcessService: CreateProcessService;
let showProcessService: ShowProcessService;

describe('Show Process Service', () => {
  beforeEach(() => {
    fakeProcessRepository = new FakeProcessesRepository();
    createProcessService = new CreateProcessService(fakeProcessRepository);
    showProcessService = new ShowProcessService(fakeProcessRepository);
  });

  it('should be able to show a Process', async () => {
    const process = await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
    });

    const { id } = process;

    const processFinded = await showProcessService.execute({ id });

    expect(process).toEqual(processFinded);
  });

  it('should not be able to show a inexistent Process', async () => {
    expect(
      showProcessService.execute({
        id: 'inexistent-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
