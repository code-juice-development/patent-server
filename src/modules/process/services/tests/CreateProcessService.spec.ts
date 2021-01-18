import AppError from '@shared/errors/AppError';

import FakeProcessesRepository from '@modules/process/repositories/fakes/FakeProcessesRepository';
import FakeProcessStagesRepository from '@modules/processStages/repositories/fakes/FakeProcessStagesRepository';
import FakeProcessStatusStagesRepository from '@modules/processStatusStages/repositories/fakes/FakeProcessStatusStagesRepository';

import CreateProcessService from '@modules/process/services/CreateProcessService';

let fakeProcessesRepository: FakeProcessesRepository;
let fakeProcessesStagesRepository: FakeProcessStagesRepository;
let fakeProcessesStatusStagesRepository: FakeProcessStatusStagesRepository;
let createProcessService: CreateProcessService;

describe('Create Process Service', () => {
  beforeEach(() => {
    fakeProcessesRepository = new FakeProcessesRepository();
    fakeProcessesStagesRepository = new FakeProcessStagesRepository();
    fakeProcessesStatusStagesRepository = new FakeProcessStatusStagesRepository();
    createProcessService = new CreateProcessService(
      fakeProcessesRepository,
      fakeProcessesStagesRepository,
      fakeProcessesStatusStagesRepository,
    );
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
      process_stage_id: '',
    });

    expect(process).toHaveProperty('id');
  });

  it('should be able to create a new Process with initial Stage', async () => {
    const processStage = await fakeProcessesStagesRepository.create({
      name: 'Reavaliação',
      code: 'X4568',
      description: 'Reavaliar o requerimento pendente no protocolo',
      deadline: '15',
      send_message: true,
      model_message: 'Oi, etapa atualizada',
      send_email: false,
      model_email: '',
    });

    const process = await createProcessService.execute({
      number: '156156',
      brand: 'JJ Multimarcas',
      kind: 'Marcas e Patentes',
      presentation: 'Visual',
      last_update: '01/01/2021',
      birthday: '01/01/2021',
      client_id: '95342393000128',
      process_stage_id: processStage.id,
    });

    const processStatusStages = await fakeProcessesStatusStagesRepository.findByProcessId(
      process.id,
    );

    const processStatusStage = processStatusStages.pop();

    expect(processStatusStage?.process_stage_id).toEqual(processStage.id);
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
      process_stage_id: '',
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
        process_stage_id: '',
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
      process_stage_id: '',
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
        process_stage_id: '',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
