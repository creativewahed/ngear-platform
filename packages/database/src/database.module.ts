import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import config from '@ngear/config';
import { TenantEntity } from './entities/tenant.entity';
import { UserEntity } from './entities/user.entity';
import { RoleEntity } from './entities/role.entity';
import { PermissionEntity } from './entities/permission.entity';
import { WalletEntity } from './entities/wallet.entity';
import { TransactionEntity } from './entities/transaction.entity';
import { RewardRuleEntity } from './entities/reward-rule.entity';
import { ProductEntity } from './entities/product.entity';
import { APIIntegrationEntity } from './entities/api-integration.entity';

@Module({
  imports: [
    // PostgreSQL configuration
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.database.url,
      entities: [
        TenantEntity,
        UserEntity,
        RoleEntity,
        PermissionEntity,
        WalletEntity,
        TransactionEntity,
        RewardRuleEntity,
        ProductEntity,
        APIIntegrationEntity,
      ],
      synchronize: config.env === 'development',
      logging: config.env === 'development',
      ssl: config.env === 'production' ? { rejectUnauthorized: false } : false,
    }),
    
    // MongoDB configuration
    MongooseModule.forRoot(config.mongodb.url),
  ],
  exports: [TypeOrmModule, MongooseModule],
})
export class DatabaseModule {}