import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // CORS configuration
  const corsOptions = {
    origin: configService.get<string>('cors.origins')?.split(',') || ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Tenant-ID', 'X-API-Version'],
    credentials: true,
  };
  app.enableCors(corsOptions);

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('NGEAR Platform API')
    .setDescription('Dynamic Multi-Tenant Loyalty, Engagement & Martech Platform API')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('authentication', 'Authentication endpoints')
    .addTag('tenants', 'Tenant management')
    .addTag('users', 'User management')
    .addTag('wallets', 'Wallet operations')
    .addTag('transactions', 'Transaction management')
    .addTag('rewards', 'Reward system')
    .addTag('analytics', 'Analytics and reporting')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);

  logger.log(`🚀 NGEAR Platform API Gateway is running on: http://localhost:${port}`);
  logger.log(`📖 API Documentation available at: http://localhost:${port}/api/docs`);
}

bootstrap().catch((error) => {
  console.error('Failed to start the application:', error);
  process.exit(1);
});