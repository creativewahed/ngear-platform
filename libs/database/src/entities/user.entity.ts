import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { TenantEntity } from './tenant.entity';
import { RoleEntity } from './role.entity';
import { WalletEntity } from './wallet.entity';

@Entity('users')
@Index(['email', 'tenantId'], { unique: true })
@Index(['username', 'tenantId'], { unique: true, where: 'username IS NOT NULL' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  tenantId: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  username?: string;

  @Column({ type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  firstName?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lastName?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  avatar?: string;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'boolean', default: false })
  isEmailVerified: boolean;

  @Column({ type: 'boolean', default: false })
  isSuperAdmin: boolean;

  @Column({ type: 'timestamp', nullable: true })
  lastLoginAt?: Date;

  @Column({ type: 'timestamp', nullable: true })
  emailVerifiedAt?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  emailVerificationToken?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  passwordResetToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  passwordResetExpiresAt?: Date;

  @Column({ type: 'int', default: 0 })
  loginAttempts: number;

  @Column({ type: 'timestamp', nullable: true })
  lockedUntil?: Date;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => TenantEntity, tenant => tenant.users)
  tenant: TenantEntity;

  @ManyToMany(() => RoleEntity, role => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' }
  })
  roles: RoleEntity[];

  @OneToMany(() => WalletEntity, wallet => wallet.user)
  wallets: WalletEntity[];
}