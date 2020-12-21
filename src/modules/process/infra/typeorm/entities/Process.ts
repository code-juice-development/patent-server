import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Client from '@modules/clients/infra/typeorm/entities/Client';

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
  client_id: string;

  @ManyToOne((_type) => Client, (client) => client.process, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  clients: Client;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default Process;
