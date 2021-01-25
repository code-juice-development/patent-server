/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */

import Bull from 'bull';
import fs from 'fs/promises';
import parser from 'xml2json';
import { container } from 'tsyringe';

import IProcessesRepository from '@modules/process/repositories/IProcessesRepository';
import IDispatchsRepository from '@modules/dispatchs/repositories/IDispatchsRepository';
import IProcessStatusStagesRepository from '@modules/processStatusStages/repositories/IProcessStatusStagesRepository';

import CreateProcessStatusStageService from '@modules/processStatusStages/services/CreateProcessStatusStageService';

interface ICreateProcessStatusStageJobData {
  path: string;
}

interface IXMLModelProcessoDespacho {
  codigo: string;
  nome: string;
}

interface IXMLModelProcesso {
  numero: string;
  despachos: {
    despacho: IXMLModelProcessoDespacho;
  };
}

interface IXMLModel {
  revista: {
    numero: string;
    data: string;
    processo: IXMLModelProcesso[];
  };
}

const CreateProcessUpdateJob = new Bull('CreateProcessStatusStageJob', {
  redis: {
    port: Number(process.env.REDIS_PORT),
    host: String(process.env.REDIS_HOST),
    password: String(process.env.REDIS_PASSWORD),
  },
});

CreateProcessUpdateJob.process(async (job, done) => {
  const { path }: ICreateProcessStatusStageJobData = job.data;

  const processesRepository = container.resolve<IProcessesRepository>(
    'ProcessesRepository',
  );
  const dispatchsRepository = container.resolve<IDispatchsRepository>(
    'DispatchsRepository',
  );

  const processStatusStagesRepository = container.resolve<IProcessStatusStagesRepository>(
    'ProcessStatusStagesRepository',
  );

  const createProcessStatusStageService = container.resolve(
    CreateProcessStatusStageService,
  );

  try {
    const xml = await fs.readFile(path);

    const dataJson: IXMLModel = JSON.parse(
      parser.toJson(xml, { reversible: true }),
    );
    const { data } = dataJson.revista;

    for await (const processo of dataJson.revista.processo) {
      const { numero, despachos } = processo;

      const process = await processesRepository.findByNumber(numero);

      if (process) {
        const { despacho } = despachos;
        const { codigo } = despacho;

        const dispatch = await dispatchsRepository.findByCode(codigo);

        if (dispatch) {
          /** On insert a new Process x Dispatch, the old Dispatchs are setted to resolved */
          const processStatusStages = await processStatusStagesRepository.findByProcessId(
            process.id,
          );

          for await (const processStatusStagePrevious of processStatusStages) {
            if (processStatusStagePrevious.has_pending) {
              await processStatusStagesRepository.updatePending(
                processStatusStagePrevious.id,
                true,
              );
            }
          }

          /** Insert a new Process x Dispatch */
          const has_pending = !!dispatch.deadline;
          const resolved_pending = false;
          const process_id = process.id;
          const dispatch_id = dispatch.id;

          const status_pending = has_pending
            ? `Fase do Processo possui prazo de ${dispatch.deadline} dias, contanto a partir de ${data}`
            : '';

          await createProcessStatusStageService.execute({
            has_pending,
            status_pending,
            resolved_pending,
            process_id,
            dispatch_id,
          });

          const [day, month, year] = data.split('/');
          const last_update = new Date(
            `${month}-${day}-${year}`,
          ).toDateString();

          await processesRepository.update({ ...process, last_update });
        }
      }
    }
  } catch (error) {
    done(new Error('Erro ao Atualizar os Processos'), { error });
  } finally {
    await fs.unlink(path);
  }

  done(null, { message: 'Processos Atualizados' });
});

export default CreateProcessUpdateJob;
