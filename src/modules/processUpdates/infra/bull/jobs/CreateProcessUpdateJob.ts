/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */

import Bull from 'bull';
import fs from 'fs/promises';
import parser from 'xml2json';
import { container } from 'tsyringe';

import IProcessesRepository from '@modules/process/repositories/IProcessesRepository';
import IDispatchsRepository from '@modules/dispatchs/repositories/IDispatchsRepository';
import IProcessDispatchsRepository from '@modules/processDispatchs/repositories/IProcessDispatchsRepository';

import CreateProcessDispatchService from '@modules/processDispatchs/services/CreateProcessDispatchService';

interface ICreateProcessDispatchJobData {
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

const CreateProcessUpdateJob = new Bull('CreateProcessDispatchJob', {
  redis: {
    port: Number(process.env.REDIS_PORT),
    host: String(process.env.REDIS_HOST),
    password: String(process.env.REDIS_PASSWORD),
  },
});

CreateProcessUpdateJob.process(async (job, done) => {
  const { path }: ICreateProcessDispatchJobData = job.data;

  const processesRepository = container.resolve<IProcessesRepository>(
    'ProcessesRepository',
  );
  const dispatchsRepository = container.resolve<IDispatchsRepository>(
    'DispatchsRepository',
  );

  const processDispatchsRepository = container.resolve<IProcessDispatchsRepository>(
    'ProcessDispatchsRepository',
  );

  const createProcessDispatchService = container.resolve(
    CreateProcessDispatchService,
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
          const processDispatch = await processDispatchsRepository.findByProcessId(
            process.id,
          );

          for await (const processDispatchPrevious of processDispatch) {
            if (processDispatchPrevious.has_pending) {
              await processDispatchsRepository.updatePending(
                processDispatchPrevious.id,
                true,
              );
            }
          }

          /** Formated Date */
          const [day, month, year] = data.split('/');
          const date = new Date(`${month}-${day}-${year}`).toDateString();

          /** Insert a new Process x Dispatch */
          const has_pending = !!dispatch.deadline;
          const resolved_pending = false;
          const publication = date;
          const process_id = process.id;
          const dispatch_id = dispatch.id;

          const status_pending = has_pending
            ? `Fase do Processo possui prazo de ${dispatch.deadline} dias, contanto a partir de ${data}`
            : '';

          await createProcessDispatchService.execute({
            has_pending,
            status_pending,
            resolved_pending,
            publication,
            process_id,
            dispatch_id,
          });

          await processesRepository.update({ ...process, last_update: date });
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
