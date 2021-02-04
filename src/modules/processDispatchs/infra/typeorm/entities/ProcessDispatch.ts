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
import Dispatch from '@modules/dispatchs/infra/typeorm/entities/Dispatch';

@Entity('process_dispatchs')
class ProcessDispatch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  has_pending: boolean;

  @Column()
  status_pending: string;

  @Column()
  resolved_pending: boolean;

  @Column()
  publication: string;

  @Column()
  complement: string;

  @Column()
  annotation: string;

  @Column()
  process_id: string;

  @ManyToOne((_type) => Process, (process) => process.process_dispatchs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'process_id', referencedColumnName: 'id' })
  process: Process;

  @Column()
  dispatch_id: string;

  @ManyToOne((_type) => Dispatch, (dispatch) => dispatch.process_dispatchs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'dispatch_id', referencedColumnName: 'id' })
  dispatch: Dispatch;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default ProcessDispatch;
