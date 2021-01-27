import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import ProcessDispatch from '@modules/processDispatchs/infra/typeorm/entities/ProcessDispatch';

@Entity('processes')
class Process {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  number: string;

  @Column()
  brand: string;

  @Column()
  kind: string;

  @Column()
  presentation: string;

  @Column()
  last_update: string;

  @Column()
  birthday: string;

  @Column()
  filed: boolean;

  @Column()
  client_id: string;

  @ManyToOne((_type) => Client, (client) => client.process, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client: Client;

  @OneToMany(
    (_type) => ProcessDispatch,
    (processDispatch) => processDispatch.process,
  )
  process_dispatchs: ProcessDispatch[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default Process;
