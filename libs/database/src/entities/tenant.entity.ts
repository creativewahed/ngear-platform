import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('tenants')
@Index(['slug'], { unique: true })
@Index(['domain'], { unique: true, where: 'domain IS NOT NULL' })
@Index(['subdomain'], { unique: true, where: 'subdomain IS NOT NULL' })
export class TenantEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  domain?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  subdomain?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  logoUrl?: string;

  @Column({ type: 'jsonb', nullable: true })
  brandColors?: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
  };

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'jsonb' })
  subscription: {
    plan: string;
    status: 'active' | 'inactive' | 'suspended' | 'cancelled';
    startDate: Date;
    endDate?: Date;
    features: string[];
    limits: Record<string, number>;
  };

  @Column({ type: 'jsonb' })
  settings: {
    timezone: string;
    currency: string;
    language: string;
    dateFormat: string;
    numberFormat: string;
    features: Record<string, boolean>;
    integrations: Record<string, any>;
    customFields: Array<{
      name: string;
      type: 'string' | 'number' | 'boolean' | 'date' | 'json';
      required: boolean;
      defaultValue?: any;
      validation?: Record<string, any>;
    }>;
  };

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @OneToMany(() => UserEntity, user => user.tenant)
  users: UserEntity[];
}