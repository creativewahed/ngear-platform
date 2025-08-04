import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from '../modules/auth/auth.module';
import { TenantModule } from '../modules/tenant/tenant.module';
import { UserModule } from '../modules/user/user.module';
import { WalletModule } from '../modules/wallet/wallet.module';
import { NotificationModule } from '../modules/notification/notification.module';
import { AnalyticsModule } from '../modules/analytics/analytics.module';
import { HealthModule } from '../modules/health/health.module';
import configuration from '../config/configuration';

@Module({
  imports: [
    // Configuration module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.local', '.env'],
    }),

    // Rate limiting
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get<number>('throttle.ttl', 60) * 1000,
          limit: configService.get<number>('throttle.limit', 100),
        },
      ],
    }),

    // Database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get<boolean>('database.synchronize', false),
        logging: configService.get<boolean>('database.logging', false),
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsRun: configService.get<boolean>('database.migrationsRun', true),
      }),
    }),

    // Feature modules
    AuthModule,
    TenantModule,
    UserModule,
    WalletModule,
    NotificationModule,
    AnalyticsModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}