import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from '@ngear/config';
import * as helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Security middleware
  app.use(helmet());
  app.use(compression());

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  // CORS configuration
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api/v1');

  // Swagger documentation
  if (config.env === 'development') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('NGEAR Platform API')
      .setDescription('Multi-tenant loyalty, engagement & martech platform')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('Authentication')
      .addTag('Tenants')
      .addTag('Users')
      .addTag('Roles')
      .addTag('Wallets')
      .addTag('Transactions')
      .addTag('Reward Rules')
      .addTag('Products')
      .addTag('Integrations')
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api/docs', app, document);
  }

  await app.listen(config.port);
  console.log(`🚀 API Gateway running on port ${config.port}`);
  console.log(`📚 API Documentation: http://localhost:${config.port}/api/docs`);
}

bootstrap().catch((error) => {
  console.error('❌ Failed to start API Gateway:', error);
  process.exit(1);
});