import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index, ManyToOne } from 'typeorm';
import { WalletEntity } from './wallet.entity';

@Entity('transactions')
@Index(['walletId', 'createdAt'])
@Index(['type', 'createdAt'])
@Index(['reference'], { where: 'reference IS NOT NULL' })
export class TransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  walletId: string;

  @Column({ type: 'varchar', length: 20 })
  type: 'credit' | 'debit' | 'refund' | 'adjustment';

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  balanceAfter: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  reference?: string;

  @Column({ type: 'varchar', length: 50, default: 'completed' })
  status: 'pending' | 'completed' | 'failed' | 'cancelled';

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  // Relations
  @ManyToOne(() => WalletEntity, wallet => wallet.transactions)
  wallet: WalletEntity;
}