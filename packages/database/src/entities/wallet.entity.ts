import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
} from 'typeorm';
import { WalletType, WalletStatus } from '@ngear/types';
import { UserEntity } from './user.entity';
import { TransactionEntity } from './transaction.entity';

@Entity('wallets')
@Index(['userId', 'type'], { unique: true })
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  userId: string;

  @Column()
  @Index()
  tenantId: string;

  @Column({
    type: 'enum',
    enum: WalletType,
  })
  type: WalletType;

  @Column({ default: 'USD' })
  currency: string;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  balance: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  availableBalance: number;

  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  lockedBalance: number;

  @Column({
    type: 'enum',
    enum: WalletStatus,
    default: WalletStatus.ACTIVE,
  })
  status: WalletStatus;

  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;

  @ManyToOne(() => UserEntity, (user) => user.wallets)
  user: UserEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.wallet)
  transactions: TransactionEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}