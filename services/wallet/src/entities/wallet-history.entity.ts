import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity('wallet_history')
@Index(['tenantId', 'walletId'])
@Index(['tenantId', 'userId'])
@Index(['createdAt'])
export class WalletHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  tenantId: string;

  @Column()
  @Index()
  walletId: string;

  @ManyToOne(() => Wallet, wallet => wallet.history, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'walletId' })
  wallet: Wallet;

  @Column()
  @Index()
  userId: string;

  @Column()
  action: 'created' | 'activated' | 'deactivated' | 'frozen' | 'unfrozen' | 'balance_updated' | 'limits_updated' | 'settings_updated' | 'expired' | 'deleted';

  @Column('decimal', { precision: 18, scale: 8, nullable: true })
  balanceBefore?: string;

  @Column('decimal', { precision: 18, scale: 8, nullable: true })
  balanceAfter?: string;

  @Column('decimal', { precision: 18, scale: 8, nullable: true })
  amountChanged?: string;

  @Column({ nullable: true })
  transactionId?: string;

  @Column('jsonb', { default: {} })
  changes: {
    field?: string;
    oldValue?: any;
    newValue?: any;
    reason?: string;
  };

  @Column('jsonb', { default: {} })
  metadata: {
    source?: string;
    performedBy?: string;
    ipAddress?: string;
    userAgent?: string;
    reason?: string;
    notes?: string;
  };

  @CreateDateColumn()
  createdAt: Date;

  // Virtual properties
  get isBalanceChange(): boolean {
    return this.action === 'balance_updated';
  }

  get formattedChange(): string | null {
    if (!this.amountChanged) return null;
    const sign = this.amountChanged.startsWith('-') ? '' : '+';
    return `${sign}${this.amountChanged}`;
  }
}