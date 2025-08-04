import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

@Entity('refresh_tokens')
@Index(['token'], { unique: true })
@Index(['userId'])
export class RefreshToken {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  @Index()
  userId: string;

  @ApiProperty()
  @Column()
  @Index()
  tenantId: string;

  @ApiProperty()
  @Column({ unique: true })
  token: string;

  @ApiProperty()
  @Column()
  expiresAt: Date;

  @ApiProperty()
  @Column({ default: false })
  isRevoked: boolean;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  deviceInfo?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  ipAddress?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  userAgent?: string;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  // Helper methods
  get isExpired(): boolean {
    return new Date() > this.expiresAt;
  }

  get isValid(): boolean {
    return !this.isRevoked && !this.isExpired;
  }
}