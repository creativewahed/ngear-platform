import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { User } from './user.entity';

@Entity('login_attempts')
export class LoginAttempt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId?: string;

  @ManyToOne(() => User, user => user.loginAttempts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user?: User;

  @Column()
  @Index()
  email: string;

  @Column()
  @Index()
  ipAddress: string;

  @Column({ nullable: true })
  userAgent?: string;

  @Column({ default: false })
  isSuccessful: boolean;

  @Column({ nullable: true })
  failureReason?: string;

  @CreateDateColumn()
  @Index()
  createdAt: Date;
}