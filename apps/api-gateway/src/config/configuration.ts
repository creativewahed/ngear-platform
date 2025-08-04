export default () => ({
  // Application configuration
  app: {
    name: process.env['APP_NAME'] || 'NGEAR Platform',
    version: process.env['APP_VERSION'] || '1.0.0',
    environment: process.env['NODE_ENV'] || 'development',
    port: parseInt(process.env['PORT'] || '3000', 10),
    globalPrefix: process.env['GLOBAL_PREFIX'] || 'api/v1',
  },

  // Database configuration
  database: {
    type: 'postgres',
    host: process.env['DB_HOST'] || 'localhost',
    port: parseInt(process.env['DB_PORT'] || '5432', 10),
    username: process.env['DB_USERNAME'] || 'ngear',
    password: process.env['DB_PASSWORD'] || 'password',
    name: process.env['DB_NAME'] || 'ngear_platform',
    synchronize: process.env['DB_SYNCHRONIZE'] === 'true',
    logging: process.env['DB_LOGGING'] === 'true',
    migrationsRun: process.env['DB_MIGRATIONS_RUN'] !== 'false',
  },

  // Redis configuration
  redis: {
    host: process.env['REDIS_HOST'] || 'localhost',
    port: parseInt(process.env['REDIS_PORT'] || '6379', 10),
    password: process.env['REDIS_PASSWORD'] || '',
    db: parseInt(process.env['REDIS_DB'] || '0', 10),
    keyPrefix: process.env['REDIS_KEY_PREFIX'] || 'ngear:',
  },

  // JWT configuration
  jwt: {
    secret: process.env['JWT_SECRET'] || 'your-super-secret-jwt-key-change-in-production',
    expiresIn: process.env['JWT_EXPIRES_IN'] || '15m',
    refreshSecret: process.env['JWT_REFRESH_SECRET'] || 'your-refresh-secret-key-change-in-production',
    refreshExpiresIn: process.env['JWT_REFRESH_EXPIRES_IN'] || '7d',
    issuer: process.env['JWT_ISSUER'] || 'ngear-platform',
    audience: process.env['JWT_AUDIENCE'] || 'ngear-clients',
  },

  // Rate limiting configuration
  throttle: {
    ttl: parseInt(process.env['THROTTLE_TTL'] || '60', 10),
    limit: parseInt(process.env['THROTTLE_LIMIT'] || '100', 10),
  },

  // CORS configuration
  cors: {
    origins: process.env['CORS_ORIGINS'] || 'http://localhost:3000,http://localhost:3001',
  },

  // Microservices configuration
  services: {
    auth: {
      host: process.env['AUTH_SERVICE_HOST'] || 'localhost',
      port: parseInt(process.env['AUTH_SERVICE_PORT'] || '3001', 10),
    },
    tenant: {
      host: process.env['TENANT_SERVICE_HOST'] || 'localhost',
      port: parseInt(process.env['TENANT_SERVICE_PORT'] || '3002', 10),
    },
    user: {
      host: process.env['USER_SERVICE_HOST'] || 'localhost',
      port: parseInt(process.env['USER_SERVICE_PORT'] || '3003', 10),
    },
    wallet: {
      host: process.env['WALLET_SERVICE_HOST'] || 'localhost',
      port: parseInt(process.env['WALLET_SERVICE_PORT'] || '3004', 10),
    },
    notification: {
      host: process.env['NOTIFICATION_SERVICE_HOST'] || 'localhost',
      port: parseInt(process.env['NOTIFICATION_SERVICE_PORT'] || '3005', 10),
    },
    analytics: {
      host: process.env['ANALYTICS_SERVICE_HOST'] || 'localhost',
      port: parseInt(process.env['ANALYTICS_SERVICE_PORT'] || '3006', 10),
    },
  },

  // Kafka configuration
  kafka: {
    brokers: process.env['KAFKA_BROKERS']?.split(',') || ['localhost:9092'],
    clientId: process.env['KAFKA_CLIENT_ID'] || 'ngear-api-gateway',
    groupId: process.env['KAFKA_GROUP_ID'] || 'ngear-gateway-group',
  },

  // Email configuration
  email: {
    host: process.env['EMAIL_HOST'] || 'localhost',
    port: parseInt(process.env['EMAIL_PORT'] || '587', 10),
    secure: process.env['EMAIL_SECURE'] === 'true',
    username: process.env['EMAIL_USERNAME'] || '',
    password: process.env['EMAIL_PASSWORD'] || '',
    from: process.env['EMAIL_FROM'] || 'noreply@ngear-platform.com',
  },

  // File upload configuration
  upload: {
    maxFileSize: parseInt(process.env['UPLOAD_MAX_FILE_SIZE'] || '10485760', 10), // 10MB
    allowedImageTypes: process.env['UPLOAD_ALLOWED_IMAGE_TYPES']?.split(',') || [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ],
    uploadPath: process.env['UPLOAD_PATH'] || 'uploads',
    tempPath: process.env['UPLOAD_TEMP_PATH'] || 'temp',
  },

  // Security configuration
  security: {
    bcryptRounds: parseInt(process.env['BCRYPT_ROUNDS'] || '12', 10),
    maxLoginAttempts: parseInt(process.env['MAX_LOGIN_ATTEMPTS'] || '5', 10),
    lockoutDuration: parseInt(process.env['LOCKOUT_DURATION'] || '900000', 10), // 15 minutes
  },

  // Logging configuration
  logging: {
    level: process.env['LOG_LEVEL'] || 'info',
    format: process.env['LOG_FORMAT'] || 'json',
    file: process.env['LOG_FILE'] || '',
  },

  // Feature flags
  features: {
    enableSwagger: process.env['ENABLE_SWAGGER'] !== 'false',
    enableMetrics: process.env['ENABLE_METRICS'] !== 'false',
    enableHealthCheck: process.env['ENABLE_HEALTH_CHECK'] !== 'false',
  },
});