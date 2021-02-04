import Bull from 'bull';

import Mail from '@shared/infra/nodemailer';

import Client from '@modules/clients/infra/typeorm/entities/Client';

interface IMailJobData {
  model_email: string;
  client: Client;
}

const MailJob = new Bull('MailJob', {
  redis: {
    port: Number(process.env.REDIS_PORT),
    host: String(process.env.REDIS_HOST),
    password: String(process.env.REDIS_PASSWORD),
  },
});

MailJob.process(async (job, done) => {
  const { model_email, client }: IMailJobData = job.data;

  try {
    await Mail.sendMail({
      from: process.env.MAIL_FROM,
      to: `${client.name} <${client.email}>`,
      subject: 'Atualização do Processo',
      html: model_email,
    });
    done(null, { message: 'Envio de E-mail completo' });
  } catch (error) {
    done(new Error('Erro ao Enviar o e-mail'), { error });
  }
});

export default MailJob;
