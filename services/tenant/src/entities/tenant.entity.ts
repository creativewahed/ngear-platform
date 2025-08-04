import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, OneToMany } from 'typeorm';
import { TenantUser } from './tenant-user.entity';
import { TenantSubscription } from './tenant-subscription.entity';
import { TenantApiKey } from './tenant-api-key.entity';

@Entity('tenants')
@Index(['slug'], { unique: true })
@Index(['domain'], { unique: true, where: 'domain IS NOT NULL' })
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  @Index()
  slug: string;

  @Column({ nullable: true, unique: true })
  domain?: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: 'trial' })
  status: 'trial' | 'active' | 'suspended' | 'cancelled';

  @Column('jsonb')
  settings: {
    allowRegistration: boolean;
    requireEmailVerification: boolean;
    requirePhoneVerification: boolean;
    sessionTimeout: number;
    maxUsers: number;
    features: string[];
    integrations: {
      email: boolean;
      sms: boolean;
      analytics: boolean;
      customDomain: boolean;
    };
    security: {
      mfaRequired: boolean;
      passwordPolicy: {
        minLength: number;
        requireUppercase: boolean;
        requireLowercase: boolean;
        requireNumbers: boolean;
        requireSpecialChars: boolean;
        maxAge: number;
        preventReuse: number;
      };
      sessionPolicy: {
        maxConcurrentSessions: number;
        idleTimeout: number;
        absoluteTimeout: number;
      };
    };
  };

  @Column('jsonb')
  branding: {
    logo?: string;
    favicon?: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    customCss?: string;
    emailTemplate?: string;
    loginPageCustomization?: {
      backgroundImage?: string;
      welcomeMessage?: string;
      footerText?: string;
    };
  };

  @Column('jsonb')
  contactInfo: {
    companyName: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
    phone: string;
    email: string;
    website?: string;
    timezone: string;
    currency: string;
    locale: string;
  };

  @Column('jsonb', { default: {} })
  metadata: {
    industry?: string;
    companySize?: string;
    expectedUsers?: number;
    onboardingCompleted?: boolean;
    lastActivityAt?: Date;
    tags?: string[];
    notes?: string;
  };

  @Column({ nullable: true })
  parentTenantId?: string;

  @Column('simple-array', { default: '' })
  childTenantIds: string[];

  @Column({ nullable: true })
  trialEndsAt?: Date;

  @Column({ nullable: true })
  suspendedAt?: Date;

  @Column({ nullable: true })
  suspensionReason?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @Column({ default: 1 })
  version: number;

  // Relations
  @OneToMany(() => TenantUser, tenantUser => tenantUser.tenant)
  tenantUsers: TenantUser[];

  @OneToMany(() => TenantSubscription, subscription => subscription.tenant)
  subscriptions: TenantSubscription[];

  @OneToMany(() => TenantApiKey, apiKey => apiKey.tenant)
  apiKeys: TenantApiKey[];

  // Virtual properties
  get isTrialExpired(): boolean {
    return this.trialEndsAt ? this.trialEndsAt < new Date() : false;
  }

  get daysUntilTrialExpiry(): number {
    if (!this.trialEndsAt) return 0;
    const now = new Date();
    const diff = this.trialEndsAt.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  get isSuspended(): boolean {
    return this.status === 'suspended';
  }

  get displayName(): string {
    return this.name || this.slug;
  }
}