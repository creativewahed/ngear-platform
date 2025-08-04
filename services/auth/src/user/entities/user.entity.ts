import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Tenant } from '../../tenant/entities/tenant.entity';
import { Role } from '../../role/entities/role.entity';

@Entity('users')
@Index(['tenantId', 'email'], { unique: true })
@Index(['tenantId', 'username'], { unique: true, where: 'username IS NOT NULL' })
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  @Index()
  tenantId: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  username?: string;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @Exclude()
  @Column()
  password: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  avatar?: string;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty()
  @Column({ default: false })
  isEmailVerified: boolean;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  emailVerificationToken?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  passwordResetToken?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  passwordResetExpires?: Date;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  lastLoginAt?: Date;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  lastLoginIp?: string;

  @ApiProperty()
  @Column({ default: 0 })
  loginAttempts: number;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  lockedUntil?: Date;

  @ApiProperty()
  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ required: false })
  @DeleteDateColumn()
  deletedAt?: Date;

  // Relations
  @ManyToOne(() => Tenant, tenant => tenant.users, { eager: false })
  tenant: Tenant;

  @ManyToMany(() => Role, role => role.users, { eager: false })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles: Role[];

  // Virtual properties
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  get isLocked(): boolean {
    return !!(this.lockedUntil && this.lockedUntil > new Date());
  }

  // Helper methods
  incrementLoginAttempts(): void {
    this.loginAttempts += 1;
    
    // Lock account after 5 failed attempts for 30 minutes
    if (this.loginAttempts >= 5) {
      this.lockedUntil = new Date(Date.now() + 30 * 60 * 1000);
    }
  }

  resetLoginAttempts(): void {
    this.loginAttempts = 0;
    this.lockedUntil = null;
    this.lastLoginAt = new Date();
  }
}