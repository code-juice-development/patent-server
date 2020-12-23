import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Process from '@modules/process/infra/typeorm/entities/Process';
import ProcessStage from '@modules/processStages/infra/typeorm/entities/ProcessStage';

@Entity('process_status_stages')
class ProcessStatusStage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  has_pending: boolean;

  @Column()
  status_pending: string;

  @Column()
  resolved_pending: boolean;

  @Column()
  process_id: string;

  @ManyToOne((_type) => Process, (process) => process.process_status_stages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'process_id', referencedColumnName: 'id' })
  process: Process;

  @Column()
  process_stage_id: string;

  @ManyToOne(
    (_type) => ProcessStage,
    (processStage) => processStage.process_status_stages,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'process_stage_id', referencedColumnName: 'id' })
  processStage: ProcessStage;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default ProcessStatusStage;
