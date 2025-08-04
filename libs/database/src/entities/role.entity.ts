import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { TenantEntity } from './tenant.entity';
import { UserEntity } from './user.entity';
import { PermissionEntity } from './permission.entity';

@Entity('roles')
@Index(['name', 'tenantId'], { unique: true })
export class RoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  tenantId: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;

  @Column({ type: 'boolean', default: false })
  isSystemRole: boolean;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => TenantEntity)
  tenant: TenantEntity;

  @ManyToMany(() => UserEntity, user => user.roles)
  users: UserEntity[];

  @ManyToMany(() => PermissionEntity, permission => permission.roles)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: { name: 'roleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' }
  })
  permissions: PermissionEntity[];
}