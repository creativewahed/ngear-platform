import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
} from 'typeorm';
import { TransactionType, TransactionStatus } from '@ngear/types';
import { WalletEntity } from './wallet.entity';
import { UserEntity } from './user.entity';

@Entity('transactions')
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  walletId: string;

  @Column()
  @Index()
  userId: string;

  @Column()
  @Index()
  tenantId: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @Column({ default: 'USD' })
  currency: string;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;

  @Column({ unique: true })
  reference: string;

  @Column()
  description: string;

  @Column('jsonb', { nullable: true })
  metadata: Record<string, any>;

  @Column({ nullable: true })
  processedAt: Date;

  @Column({ nullable: true })
  failureReason: string;

  @Column({ nullable: true })
  externalTransactionId: string;

  @ManyToOne(() => WalletEntity, (wallet) => wallet.transactions)
  wallet: WalletEntity;

  @ManyToOne(() => UserEntity)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}