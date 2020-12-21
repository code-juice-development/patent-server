import FakeProcessesRepository from '@modules/process/repositories/fakes/FakeProcessesRepository';

import CreateProcessService from '@modules/process/services/CreateProcessService';
import DeleteProcessService from '@modules/process/services/DeleteProcessService';

let fakeProcessRepository: FakeProcessesRepository;
let createProcessService: CreateProcessService;
let deleteProcessService: DeleteProcessService;

describe('Create Process Service', () => {
  beforeEach(() => {
    fakeProcessRepository = new FakeProcessesRepository();
    createProcessService = new CreateProcessService(fakeProcessRepository);
    deleteProcessService = new DeleteProcessService(fakeProcessRepository);
  });

  it('should be able to create a new Process', async () => {
    const { id } = await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
    });

    await deleteProcessService.execute({ id });

    const process = await fakeProcessRepository.findById(id);

    expect(process).toBeUndefined();
  });
});
