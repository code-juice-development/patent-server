/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */

import Bull from 'bull';
import fs from 'fs/promises';
import parser from 'xml2json';
import { container } from 'tsyringe';

import IProcessesRepository from '@modules/process/repositories/IProcessesRepository';
import IProcessStagesRepository from '@modules/processStages/repositories/IProcessStagesRepository';
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
  const processStagesRepository = container.resolve<IProcessStagesRepository>(
    'ProcessStagesRepository',
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

        const processStage = await processStagesRepository.findByCode(codigo);

        if (processStage) {
          /** On insert a new Process Stage, the old Stages are setted to resolved */
          const processStages = await processStatusStagesRepository.findByProcessId(
            process.id,
          );

          for await (const processStagePrevious of processStages) {
            if (processStagePrevious.has_pending) {
              await processStatusStagesRepository.updatePending(
                processStagePrevious.id,
                true,
              );
            }
          }

          /** Insert a new Process Stage */
          const has_pending = !!processStage.deadline;
          const resolved_pending = false;
          const process_id = process.id;
          const process_stage_id = processStage.id;

          const status_pending = has_pending
            ? `Fase do Processo possui prazo de ${processStage.deadline} dias, contanto a partir de ${data}`
            : '';

          await createProcessStatusStageService.execute({
            has_pending,
            status_pending,
            resolved_pending,
            process_id,
            process_stage_id,
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
