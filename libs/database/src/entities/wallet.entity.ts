import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, OneToMany } from 'typeorm';
import { UserEntity } from './user.entity';
import { TransactionEntity } from './transaction.entity';

@Entity('wallets')
@Index(['userId', 'tenantId', 'type'], { unique: true })
export class WalletEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  tenantId: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  balance: number;

  @Column({ type: 'varchar', length: 10, default: 'USD' })
  currency: string;

  @Column({ type: 'varchar', length: 20 })
  type: 'points' | 'cashback' | 'voucher' | 'loyalty';

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relations
  @ManyToOne(() => UserEntity, user => user.wallets)
  user: UserEntity;

  @OneToMany(() => TransactionEntity, transaction => transaction.wallet)
  transactions: TransactionEntity[];
}