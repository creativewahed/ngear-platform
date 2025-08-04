import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, OneToMany, Unique } from 'typeorm';
import { Transaction } from './transaction.entity';
import { WalletHistory } from './wallet-history.entity';
import { Decimal } from 'decimal.js';

@Entity('wallets')
@Unique(['userId', 'tenantId', 'currency'])
@Index(['tenantId', 'userId'])
@Index(['tenantId', 'isActive'])
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  tenantId: string;

  @Column()
  @Index()
  userId: string;

  @Column()
  name: string;

  @Column()
  type: 'prepaid' | 'postpaid' | 'points' | 'credits';

  @Column({ length: 3 })
  currency: string;

  @Column('decimal', { precision: 18, scale: 8, default: '0.00000000' })
  balance: string;

  @Column('decimal', { precision: 18, scale: 8, default: '0.00000000' })
  availableBalance: string;

  @Column('decimal', { precision: 18, scale: 8, default: '0.00000000' })
  pendingBalance: string;

  @Column('decimal', { precision: 18, scale: 8, default: '0.00000000' })
  reservedBalance: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isFrozen: boolean;

  @Column('jsonb')
  limits: {
    dailySpend: string;
    monthlySpend: string;
    maxBalance: string;
    minTransactionAmount: string;
    maxTransactionAmount: string;
    dailyTransactionCount: number;
    monthlyTransactionCount: number;
  };

  @Column('jsonb')
  settings: {
    allowNegativeBalance: boolean;
    autoTopup: {
      enabled: boolean;
      threshold: string;
      amount: string;
      source: string;
    };
    notifications: {
      lowBalance: boolean;
      transactions: boolean;
      threshold: string;
    };
    security: {
      requirePinForTransactions: boolean;
      requireOtpForLargeTransactions: boolean;
      largeTransactionThreshold: string;
    };
  };

  @Column('jsonb', { default: {} })
  metadata: {
    externalWalletId?: string;
    integrationData?: any;
    tags?: string[];
    notes?: string;
    lastTopupAt?: Date;
    lastTransactionAt?: Date;
  };

  @Column({ nullable: true })
  frozenAt?: Date;

  @Column({ nullable: true })
  frozenReason?: string;

  @Column({ nullable: true })
  expiresAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column({ default: 1 })
  version: number;

  // Relations
  @OneToMany(() => Transaction, transaction => transaction.wallet)
  transactions: Transaction[];

  @OneToMany(() => WalletHistory, history => history.wallet)
  history: WalletHistory[];

  // Virtual properties
  get balanceDecimal(): Decimal {
    return new Decimal(this.balance);
  }

  get availableBalanceDecimal(): Decimal {
    return new Decimal(this.availableBalance);
  }

  get pendingBalanceDecimal(): Decimal {
    return new Decimal(this.pendingBalance);
  }

  get reservedBalanceDecimal(): Decimal {
    return new Decimal(this.reservedBalance);
  }

  get isExpired(): boolean {
    return this.expiresAt ? this.expiresAt < new Date() : false;
  }

  get canTransact(): boolean {
    return this.isActive && !this.isFrozen && !this.isExpired;
  }

  get formattedBalance(): string {
    return `${this.balance} ${this.currency}`;
  }

  canDebit(amount: string): boolean {
    const amountDecimal = new Decimal(amount);
    const availableDecimal = this.availableBalanceDecimal;
    
    if (this.settings.allowNegativeBalance) {
      return true;
    }
    
    return availableDecimal.gte(amountDecimal);
  }

  isWithinDailyLimit(amount: string): boolean {
    const amountDecimal = new Decimal(amount);
    const limitDecimal = new Decimal(this.limits.dailySpend);
    
    // This would need to check actual daily spending from transactions
    // For now, we'll assume it's within limits
    return amountDecimal.lte(limitDecimal);
  }

  isWithinTransactionLimits(amount: string): boolean {
    const amountDecimal = new Decimal(amount);
    const minLimit = new Decimal(this.limits.minTransactionAmount);
    const maxLimit = new Decimal(this.limits.maxTransactionAmount);
    
    return amountDecimal.gte(minLimit) && amountDecimal.lte(maxLimit);
  }
}