import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { IntegrationType, IntegrationStatus } from '@ngear/types';

@Entity('api_integrations')
export class APIIntegrationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  tenantId: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: IntegrationType,
  })
  type: IntegrationType;

  @Column()
  endpoint: string;

  @Column()
  method: string;

  @Column('jsonb', { nullable: true })
  headers: Record<string, string>;

  @Column('jsonb')
  authentication: Record<string, any>;

  @Column('jsonb')
  mapping: any[];

  @Column({
    type: 'enum',
    enum: IntegrationStatus,
    default: IntegrationStatus.INACTIVE,
  })
  status: IntegrationStatus;

  @Column({ nullable: true })
  lastSyncAt: Date;

  @Column({ nullable: true })
  lastErrorAt: Date;

  @Column({ nullable: true })
  lastError: string;

  @Column('jsonb', { nullable: true })
  config: Record<string, any>;

  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;

  @Column({ default: 0 })
  syncCount: number;

  @Column({ default: 0 })
  errorCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}