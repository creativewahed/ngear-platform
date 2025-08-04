import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id', nullable: true })
  tenantId?: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ default: 'tenant-user' })
  role: string;

  @Column('simple-array', { default: '' })
  permissions: string[];

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'pending'],
    default: 'pending',
  })
  status: 'active' | 'inactive' | 'pending';

  @Column({ name: 'email_verified', default: false })
  emailVerified: boolean;

  @Column({ name: 'email_verification_token', nullable: true })
  emailVerificationToken?: string;

  @Column({ name: 'password_reset_token', nullable: true })
  passwordResetToken?: string;

  @Column({ name: 'password_reset_expires', nullable: true })
  passwordResetExpires?: Date;

  @Column({ name: 'last_login', nullable: true })
  lastLogin?: Date;

  @Column({ name: 'login_attempts', default: 0 })
  loginAttempts: number;

  @Column({ name: 'locked_until', nullable: true })
  lockedUntil?: Date;

  @Column('json', { nullable: true })
  profile?: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}