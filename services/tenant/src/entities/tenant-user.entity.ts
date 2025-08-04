import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Tenant } from './tenant.entity';

@Entity('tenant_users')
@Index(['tenantId', 'userId'], { unique: true })
export class TenantUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  tenantId: string;

  @ManyToOne(() => Tenant, tenant => tenant.tenantUsers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @Column()
  @Index()
  userId: string;

  @Column('simple-array')
  roles: string[];

  @Column('simple-array', { default: '' })
  permissions: string[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  invitedBy?: string;

  @Column({ nullable: true })
  invitedAt?: Date;

  @Column({ nullable: true })
  joinedAt?: Date;

  @Column({ nullable: true })
  lastAccessAt?: Date;

  @Column('jsonb', { default: {} })
  preferences: {
    notifications: boolean;
    theme: string;
    language: string;
    timezone: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  // Virtual properties
  get isInvitePending(): boolean {
    return this.invitedAt !== null && this.joinedAt === null;
  }

  get hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  get hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}