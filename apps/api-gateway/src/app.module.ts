import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseModule } from '@ngear/database';
import { AuthModule } from '@ngear/auth';
import config from '@ngear/config';

// Import modules
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { TenantModule } from './modules/tenant/tenant.module';
import { UserModule } from './modules/user/user.module';
import { RoleModule } from './modules/role/role.module';
import { WalletModule } from './modules/wallet/wallet.module';
import { TransactionModule } from './modules/transaction/transaction.module';
import { RewardRuleModule } from './modules/reward-rule/reward-rule.module';
import { ProductModule } from './modules/product/product.module';
import { IntegrationModule } from './modules/integration/integration.module';

@Module({
  imports: [
    // Rate limiting
    ThrottlerModule.forRoot([
      {
        ttl: config.rateLimit.windowMs,
        limit: config.rateLimit.maxRequests,
      },
    ]),

    // GraphQL
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: config.env === 'development',
      introspection: config.env === 'development',
      context: ({ req }) => ({ req }),
    }),

    // Core modules
    DatabaseModule,
    AuthModule,

    // Feature modules
    AuthenticationModule,
    TenantModule,
    UserModule,
    RoleModule,
    WalletModule,
    TransactionModule,
    RewardRuleModule,
    ProductModule,
    IntegrationModule,
  ],
})
export class AppModule {}