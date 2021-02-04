import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('process_updates')
class ProcessUpdate {
  @PrimaryGeneratedColumn()
  id: string;

  /**
   * @description Magazine Number
   */
  @Column({
    type: 'varchar',
    transformer: {
      to: (value: number): string => String(value),
      from: (value: string): number | null => (value ? Number(value) : null),
    },
  })
  number: number | null;

  /**
   * @description Magazine Date
   */
  @Column()
  date: string;

  /**
   * @description Upload Date
   */
  @Column()
  upload: string;

  /**
   * @description Log of Update
   */
  @Column()
  description: string;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}

export default ProcessUpdate;
