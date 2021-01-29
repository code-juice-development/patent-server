import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import ProcessDispatch from '@modules/processDispatchs/infra/typeorm/entities/ProcessDispatch';

@Entity('dispatchs')
class Dispatch {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  description: string;

  /**
   * @description Days
   */
  @Column()
  deadline: number | null;

  @Column()
  send_message: boolean;

  @Column()
  model_message: string;

  @Column()
  send_email: boolean;

  @Column()
  model_email: string;

  /**
   * @description Months
   */
  @Column()
  after_sale: number | null;

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

export default Dispatch;
