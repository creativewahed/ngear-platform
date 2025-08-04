import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity('transactions')
@Index(['tenantId', 'walletId'])
@Index(['tenantId', 'userId'])
@Index(['tenantId', 'status'])
@Index(['tenantId', 'type'])
@Index(['createdAt'])
@Index(['externalTransactionId'], { unique: true, where: 'externalTransactionId IS NOT NULL' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  tenantId: string;

  @Column()
  @Index()
  walletId: string;

  @ManyToOne(() => Wallet, wallet => wallet.transactions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'walletId' })
  wallet: Wallet;

  @Column()
  @Index()
  userId: string;

  @Column()
  type: 'credit' | 'debit' | 'transfer_in' | 'transfer_out' | 'refund' | 'adjustment' | 'fee' | 'reward' | 'cashback';

  @Column()
  category: 'purchase' | 'reward' | 'refund' | 'transfer' | 'adjustment' | 'fee' | 'topup' | 'withdrawal' | 'cashback' | 'bonus';

  @Column('decimal', { precision: 18, scale: 8 })
  amount: string;

  @Column({ length: 3 })
  currency: string;

  @Column('decimal', { precision: 18, scale: 8 })
  balanceBefore: string;

  @Column('decimal', { precision: 18, scale: 8 })
  balanceAfter: string;

  @Column()
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'expired';

  @Column()
  reference: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  externalTransactionId?: string;

  @Column({ nullable: true })
  relatedTransactionId?: string; // For transfers, refunds, etc.

  @Column({ nullable: true })
  parentTransactionId?: string; // For fees, splits, etc.

  @Column('jsonb', { default: {} })
  metadata: {
    source?: string; // 'api', 'admin', 'system', 'integration'
    channel?: string; // 'web', 'mobile', 'pos', 'api'
    ipAddress?: string;
    userAgent?: string;
    location?: {
      country?: string;
      city?: string;
      latitude?: number;
      longitude?: number;
    };
    merchant?: {
      id?: string;
      name?: string;
      category?: string;
    };
    campaign?: {
      id?: string;
      name?: string;
      type?: string;
    };
    integration?: {
      provider?: string;
      externalId?: string;
      webhook?: any;
    };
    fraud?: {
      score?: number;
      rules?: string[];
      verified?: boolean;
    };
  };

  @Column({ nullable: true })
  processedAt?: Date;

  @Column({ nullable: true })
  failedAt?: Date;

  @Column({ nullable: true })
  failureReason?: string;

  @Column({ nullable: true })
  expiresAt?: Date;

  @Column({ nullable: true })
  authorizedBy?: string;

  @Column({ nullable: true })
  authorizedAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  // Virtual properties
  get isCompleted(): boolean {
    return this.status === 'completed';
  }

  get isPending(): boolean {
    return this.status === 'pending' || this.status === 'processing';
  }

  get isFailed(): boolean {
    return this.status === 'failed' || this.status === 'cancelled';
  }

  get isExpired(): boolean {
    return this.expiresAt ? this.expiresAt < new Date() : false;
  }

  get formattedAmount(): string {
    const sign = this.type === 'debit' ? '-' : '+';
    return `${sign}${this.amount} ${this.currency}`;
  }

  get processingTimeMs(): number | null {
    if (!this.processedAt) return null;
    return this.processedAt.getTime() - this.createdAt.getTime();
  }
}