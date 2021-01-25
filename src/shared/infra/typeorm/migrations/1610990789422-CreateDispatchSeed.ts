import { MigrationInterface, QueryRunner, In } from 'typeorm';

import Dispatch from '@modules/dispatchs/infra/typeorm/entities/Dispatch';

export class CreateDispatchSeed1610990789422 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dispatchsRepository = queryRunner.manager.getRepository(Dispatch);

    const dispatchs: Dispatch[] = [];

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Anulação de despacho',
        code: 'IPAS402',
        description: 'Anulação de despacho',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Arquivamento de ofício de pedido de registro',
        code: 'IPAS404',
        description: 'Arquivamento de ofício de pedido de registro',
        deadline: '60',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Arquivamento definitivo de pedido de registro',
        code: 'IPAS106',
        description: 'Arquivamento definitivo de pedido de registro',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Arquivamento definitivo de pedido de registro',
        code: 'IPAS139',
        description: 'Arquivamento definitivo de pedido de registro',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Arquivamento definitivo de pedido de registro',
        code: 'IPAS157',
        description: 'Arquivamento definitivo de pedido de registro',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Arquivamento definitivo de pedido de registro',
        code: 'IPAS289',
        description: 'Arquivamento definitivo de pedido de registro',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Arquivamento definitivo de pedido de registro',
        code: 'IPAS291',
        description: 'Arquivamento definitivo de pedido de registro',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Cancelamento de ofício de registro de marca',
        code: 'IPAS409',
        description: 'Cancelamento de ofício de registro de marca',
        deadline: '60',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Concessão de registro de marca',
        code: 'IPAS158',
        description: 'Concessão de registro de marca',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Deferimento de pedido de registro',
        code: 'IPAS029',
        description: 'Deferimento de pedido de registro',
        deadline: '60',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Exigência de mérito',
        code: 'IPAS136',
        description: 'Exigência de mérito',
        deadline: '60',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Exigência de pagamento ',
        code: 'IPAS395',
        description: 'Exigência de pagamento',
        deadline: '5',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Exigência formal',
        code: 'IPAS005',
        description: 'Exigência formal',
        deadline: '5',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Extinção de registro de marca',
        code: 'IPAS161',
        description: 'Extinção de registro de marca',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Extinção de registro de marca',
        code: 'IPAS304',
        description: 'Extinção de registro de marca',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Extinção de registro de marca',
        code: 'IPAS414',
        description: 'Extinção de registro de marca',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Indeferimento de pedido de registro',
        code: 'IPAS024',
        description: 'Indeferimento de pedido de registro',
        deadline: '60',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Notificação de oposição para manifestação',
        code: 'IPAS423',
        description: 'Notificação de oposição para manifestação',
        deadline: '60',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Pedido de registro considerado inexistente',
        code: 'IPAS033',
        description: 'Pedido de registro considerado inexistente',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Pedido de registro considerado inexistente',
        code: 'IPAS047',
        description: 'Pedido de registro considerado inexistente',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Pedido de registro considerado inexistente',
        code: 'IPAS091',
        description: 'Pedido de registro considerado inexistente',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Pedido de registro considerado inexistente',
        code: 'IPAS112',
        description: 'Pedido de registro considerado inexistente',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Pedido de registro considerado inexistente',
        code: 'IPAS113',
        description: 'Pedido de registro considerado inexistente',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Publicação de pedido de registro para oposição',
        code: 'IPAS009',
        description: 'Publicação de pedido de registro para oposição',
        deadline: '60',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Republicação de pedido de registro para oposição',
        code: 'IPAS135',
        description: 'Republicação de pedido de registro para oposição',
        deadline: '60',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Republicação de pedido de registro para oposição',
        code: 'IPAS421',
        description: 'Republicação de pedido de registro para oposição',
        deadline: '60',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Sobrestamento do exame de pedido de registro',
        code: 'IPAS142',
        description: 'Sobrestamento do exame de pedido de registro',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Deferimento da petição',
        code: 'IPAS270',
        description: 'Deferimento da petição',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    dispatchs.push(
      dispatchsRepository.create({
        name: 'Deferimento de designação',
        code: 'IPAS768',
        description: 'Deferimento de designação',
        deadline: '0',
        send_message: false,
        model_message: '',
        send_email: false,
        model_email: '',
      }),
    );

    await dispatchsRepository.save(dispatchs);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const dispatchsRepository = queryRunner.manager.getRepository(Dispatch);

    const dispatchsCodes = [
      'IPAS402',
      'IPAS404',
      'IPAS106',
      'IPAS139',
      'IPAS157',
      'IPAS289',
      'IPAS291',
      'IPAS409',
      'IPAS158',
      'IPAS029',
      'IPAS136',
      'IPAS395',
      'IPAS005',
      'IPAS161',
      'IPAS304',
      'IPAS414',
      'IPAS024',
      'IPAS423',
      'IPAS033',
      'IPAS047',
      'IPAS091',
      'IPAS112',
      'IPAS113',
      'IPAS009',
      'IPAS135',
      'IPAS421',
      'IPAS142',
      'IPAS270',
      'IPAS768',
    ];

    await dispatchsRepository.delete({ code: In(dispatchsCodes) });
  }
}
