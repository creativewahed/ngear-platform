import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  Index,
} from 'typeorm';
import { RoleEntity } from './role.entity';
import { UserEntity } from './user.entity';

@Entity('permissions')
@Index(['name', 'resource', 'action'], { unique: true })
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  resource: string;

  @Column()
  action: string;

  @Column({ nullable: true })
  description: string;

  @Column('jsonb', { nullable: true })
  conditions: Record<string, any>;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];

  @ManyToMany(() => UserEntity, (user) => user.permissions)
  users: UserEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}