import { MigrationInterface, QueryRunner } from 'typeorm';

import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';

import User from '@modules/users/infra/typeorm/entities/User';

export class CreateUserSeed1607449704808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersRepository = queryRunner.manager.getRepository(User);

    const hashedPassword = await new BCryptHashProvider().generateHash('admin');

    const user = usersRepository.create({
      email: 'lucas@blindarmarcas.com.br',
      name: 'Lucas Magmeski',
      password: hashedPassword,
    });

    usersRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const usersRepository = queryRunner.manager.getRepository(User);

    usersRepository.delete({ email: 'lucas@blindarmarcas.com.br' });
  }
}
