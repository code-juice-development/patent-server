import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import ProcessStatusStage from '@modules/processStatusStages/infra/typeorm/entities/ProcessStatusStage';

@Entity('process_stages')
class ProcessStage {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  description: string;

  @Column()
  deadline: string;

  @Column()
  send_message: boolean;

  @Column()
  model_message: string;

  @Column()
  send_email: boolean;

  @Column()
  model_email: string;

  @OneToMany(
    (_type) => ProcessStatusStage,
    (processStatusStage) => processStatusStage.processes,
  )
  process_status_stages: ProcessStatusStage[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default ProcessStage;
