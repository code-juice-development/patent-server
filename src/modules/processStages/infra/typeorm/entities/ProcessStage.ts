import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default ProcessStage;
