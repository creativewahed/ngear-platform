import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Index,
  Check,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '../../wallet/entities/wallet.entity';

@Entity('transactions')
@Index(['tenantId', 'walletId'])
@Index(['tenantId', 'userId'])
@Index(['tenantId', 'type'])
@Index(['tenantId', 'status'])
@Index(['referenceId'], { where: 'referenceId IS NOT NULL' })
@Check('"amount" > 0')
export class Transaction {
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
  walletId: string;

  @ApiProperty()
  @Column()
  @Index()
  userId: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['credit', 'debit', 'transfer', 'refund', 'adjustment'],
  })
  type: string;

  @ApiProperty()
  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;

  @ApiProperty()
  @Column({ length: 3 })
  currency: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  referenceId?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  relatedTransactionId?: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ['pending', 'completed', 'failed', 'cancelled', 'reversed'],
    default: 'pending',
  })
  status: string;

  @ApiProperty()
  @Column('decimal', { precision: 15, scale: 2 })
  balanceBefore: number;

  @ApiProperty()
  @Column('decimal', { precision: 15, scale: 2 })
  balanceAfter: number;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  failureReason?: string;

  @ApiProperty()
  @Column({ type: 'jsonb', default: {} })
  metadata: Record<string, any>;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => Wallet, wallet => wallet.transactions, { onDelete: 'CASCADE' })
  wallet: Wallet;

  // Helper methods
  get isCompleted(): boolean {
    return this.status === 'completed';
  }

  get isPending(): boolean {
    return this.status === 'pending';
  }

  get isFailed(): boolean {
    return this.status === 'failed';
  }

  complete(balanceAfter: number): void {
    this.status = 'completed';
    this.balanceAfter = balanceAfter;
  }

  fail(reason: string): void {
    this.status = 'failed';
    this.failureReason = reason;
  }

  cancel(): void {
    this.status = 'cancelled';
  }
}