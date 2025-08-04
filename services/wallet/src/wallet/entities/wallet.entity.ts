import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Index,
  Check,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from 'decimal.js';
import { Transaction } from '../../transaction/entities/transaction.entity';

@Entity('wallets')
@Index(['tenantId', 'userId', 'currency'], { unique: true })
@Check('"balance" >= 0')
@Check('"lockedBalance" >= 0')
export class Wallet {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  @Index()
  tenantId: string;

  @ApiProperty()
  @Column()
  @Index()
  userId: string;

  @ApiProperty()
  @Column({ length: 3 })
  currency: string;

  @ApiProperty()
  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  balance: number;

  @ApiProperty()
  @Column('decimal', { precision: 15, scale: 2, default: 0 })
  lockedBalance: number;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['main', 'bonus', 'cashback', 'voucher'],
    default: 'main',
  })
  type: string;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty()
  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ required: false })
  @DeleteDateColumn()
  deletedAt?: Date;

  // Relations
  @OneToMany(() => Transaction, transaction => transaction.wallet)
  transactions: Transaction[];

  // Virtual properties
  get availableBalance(): number {
    return new Decimal(this.balance).minus(this.lockedBalance).toNumber();
  }

  get totalBalance(): number {
    return new Decimal(this.balance).plus(this.lockedBalance).toNumber();
  }

  // Helper methods
  canDebit(amount: number): boolean {
    return this.isActive && this.availableBalance >= amount;
  }

  credit(amount: number): void {
    this.balance = new Decimal(this.balance).plus(amount).toNumber();
  }

  debit(amount: number): void {
    if (!this.canDebit(amount)) {
      throw new Error('Insufficient balance');
    }
    this.balance = new Decimal(this.balance).minus(amount).toNumber();
  }

  lock(amount: number): void {
    if (this.availableBalance < amount) {
      throw new Error('Insufficient available balance to lock');
    }
    this.lockedBalance = new Decimal(this.lockedBalance).plus(amount).toNumber();
  }

  unlock(amount: number): void {
    if (this.lockedBalance < amount) {
      throw new Error('Insufficient locked balance to unlock');
    }
    this.lockedBalance = new Decimal(this.lockedBalance).minus(amount).toNumber();
  }
}