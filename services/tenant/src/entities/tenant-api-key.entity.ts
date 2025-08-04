import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Tenant } from './tenant.entity';

@Entity('tenant_api_keys')
export class TenantApiKey {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  tenantId: string;

  @ManyToOne(() => Tenant, tenant => tenant.apiKeys, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @Column()
  name: string;

  @Column({ unique: true })
  @Index()
  keyHash: string;

  @Column()
  keyPrefix: string; // First 8 chars for display purposes

  @Column('simple-array')
  scopes: string[];

  @Column({ default: 1000 })
  rateLimit: number; // requests per minute

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  expiresAt?: Date;

  @Column({ nullable: true })
  lastUsedAt?: Date;

  @Column({ default: 0 })
  usageCount: number;

  @Column({ nullable: true })
  lastUsedIp?: string;

  @Column('jsonb', { default: {} })
  metadata: {
    description?: string;
    environment?: 'development' | 'staging' | 'production';
    createdBy?: string;
    allowedIps?: string[];
    allowedOrigins?: string[];
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  // Virtual properties
  get isExpired(): boolean {
    return this.expiresAt ? this.expiresAt < new Date() : false;
  }

  get isValid(): boolean {
    return this.isActive && !this.isExpired;
  }

  get maskedKey(): string {
    return `${this.keyPrefix}${'*'.repeat(24)}`;
  }

  get hasScope(scope: string): boolean {
    return this.scopes.includes(scope) || this.scopes.includes('*');
  }
}