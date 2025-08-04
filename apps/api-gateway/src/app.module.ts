import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthModule } from './routes/auth.module';
import { TenantModule } from './routes/tenant.module';
import { UserModule } from './routes/user.module';
import { ProxyModule } from './routes/proxy.module';
import { HealthModule } from './routes/health.module';

import { TenantMiddleware } from './middleware/tenant.middleware';
import { AuthGuard } from './middleware/auth.guard';
import { JwtStrategy } from './middleware/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('THROTTLE_TTL', 60000),
          limit: config.get('THROTTLE_LIMIT', 10),
        },
      ],
    }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET', 'default-secret'),
        signOptions: { expiresIn: config.get('JWT_EXPIRY', '24h') },
      }),
    }),
    PassportModule,
    AuthModule,
    TenantModule,
    UserModule,
    ProxyModule,
    HealthModule,
  ],
  providers: [JwtStrategy, AuthGuard],
})
export class AppModule {}