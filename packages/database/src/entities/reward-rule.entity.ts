import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { RuleStatus } from '@ngear/types';

@Entity('reward_rules')
export class RewardRuleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  tenantId: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column('jsonb')
  conditions: any[];

  @Column('jsonb')
  actions: any[];

  @Column({ default: 1 })
  priority: number;

  @Column({
    type: 'enum',
    enum: RuleStatus,
    default: RuleStatus.DRAFT,
  })
  status: RuleStatus;

  @Column()
  validFrom: Date;

  @Column({ nullable: true })
  validTo: Date;

  @Column({ nullable: true })
  maxUsage: number;

  @Column({ default: 0 })
  currentUsage: number;

  @Column('jsonb', { nullable: true })
  targetAudience: Record<string, any>;

  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}