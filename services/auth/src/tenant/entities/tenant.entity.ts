import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

@Entity('tenants')
@Index(['subdomain'], { unique: true })
@Index(['domain'], { unique: true, where: 'domain IS NOT NULL' })
export class Tenant {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ unique: true })
  subdomain: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true, unique: true })
  domain?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  logo?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  favicon?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  primaryColor?: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  secondaryColor?: string;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty()
  @Column({ type: 'jsonb', default: {} })
  settings: {
    features: string[];
    integrations: Record<string, any>;
    branding: {
      logo?: string;
      favicon?: string;
      primaryColor: string;
      secondaryColor: string;
      fontFamily?: string;
      customCSS?: string;
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
      };
      sessionTimeout: number;
      ipWhitelist?: string[];
    };
  };

  @ApiProperty()
  @Column({ type: 'jsonb', default: {} })
  subscription: {
    plan: string;
    status: string;
    startDate: Date;
    endDate?: Date;
    maxUsers: number;
    maxTransactions: number;
    features: string[];
  };

  @ApiProperty()
  @Column({ type: 'jsonb', default: {} })
  billing: {
    companyName?: string;
    address?: string;
    taxId?: string;
    billingEmail?: string;
    paymentMethod?: string;
  };

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
  @OneToMany(() => User, user => user.tenant)
  users: User[];

  // Helper methods
  get fullDomain(): string {
    return this.domain || `${this.subdomain}.ngear.app`;
  }

  hasFeature(feature: string): boolean {
    return this.settings.features?.includes(feature) || false;
  }

  isSubscriptionActive(): boolean {
    const now = new Date();
    return (
      this.subscription.status === 'active' &&
      (!this.subscription.endDate || new Date(this.subscription.endDate) > now)
    );
  }
}