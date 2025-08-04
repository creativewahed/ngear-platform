import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

import { WalletsModule } from './wallets/wallets.module';
import { TransactionsModule } from './transactions/transactions.module';
import { HealthModule } from './health/health.module';

import { Wallet } from './entities/wallet.entity';
import { Transaction } from './entities/transaction.entity';
import { WalletHistory } from './entities/wallet-history.entity';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DATABASE_URL'),
        entities: [Wallet, Transaction, WalletHistory],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
        ssl: configService.get('NODE_ENV') === 'production' ? { rejectUnauthorized: false } : false,
      }),
      inject: [ConfigService],
    }),

    // Event Emitter
    EventEmitterModule.forRoot(),

    // Scheduler for background tasks
    ScheduleModule.forRoot(),

    // Feature modules
    WalletsModule,
    TransactionsModule,
    HealthModule,
  ],
})
export class AppModule {}