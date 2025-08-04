import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, Index } from 'typeorm';
import { Tenant } from './tenant.entity';

@Entity('tenant_subscriptions')
export class TenantSubscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Index()
  tenantId: string;

  @ManyToOne(() => Tenant, tenant => tenant.subscriptions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @Column()
  planId: string;

  @Column()
  planName: string;

  @Column('jsonb')
  planFeatures: {
    maxUsers: number;
    maxApiCalls: number;
    maxStorage: number;
    features: string[];
    integrations: string[];
  };

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  currency: string;

  @Column()
  billingCycle: 'monthly' | 'quarterly' | 'yearly';

  @Column()
  status: 'active' | 'cancelled' | 'past_due' | 'trialing' | 'unpaid';

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate?: Date;

  @Column({ nullable: true })
  trialEndDate?: Date;

  @Column({ nullable: true })
  cancelledAt?: Date;

  @Column({ nullable: true })
  cancellationReason?: string;

  @Column({ nullable: true })
  nextBillingDate?: Date;

  @Column('jsonb', { default: {} })
  metadata: {
    stripeSubscriptionId?: string;
    stripeCustomerId?: string;
    paymentMethodId?: string;
    lastPaymentAt?: Date;
    lastPaymentAmount?: number;
    failedPaymentAttempts?: number;
  };

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Virtual properties
  get isActive(): boolean {
    return this.status === 'active' || this.status === 'trialing';
  }

  get isTrialing(): boolean {
    return this.status === 'trialing' && this.trialEndDate && this.trialEndDate > new Date();
  }

  get daysUntilExpiry(): number {
    if (!this.endDate) return -1;
    const now = new Date();
    const diff = this.endDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}