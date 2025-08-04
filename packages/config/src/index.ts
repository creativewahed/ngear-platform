import * as dotenv from 'dotenv';
import * as Joi from 'joi';

dotenv.config();

const configSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  
  // Database Configuration
  DATABASE_URL: Joi.string().required(),
  DATABASE_HOST: Joi.string().default('localhost'),
  DATABASE_PORT: Joi.number().default(5432),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  
  // MongoDB Configuration
  MONGODB_URL: Joi.string().required(),
  
  // Redis Configuration
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().optional(),
  
  // JWT Configuration
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().default('1d'),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),
  
  // OAuth Configuration
  OAUTH_GOOGLE_CLIENT_ID: Joi.string().optional(),
  OAUTH_GOOGLE_CLIENT_SECRET: Joi.string().optional(),
  
  // Email Configuration
  SMTP_HOST: Joi.string().required(),
  SMTP_PORT: Joi.number().default(587),
  SMTP_USER: Joi.string().required(),
  SMTP_PASSWORD: Joi.string().required(),
  
  // AWS Configuration
  AWS_REGION: Joi.string().default('us-east-1'),
  AWS_ACCESS_KEY_ID: Joi.string().optional(),
  AWS_SECRET_ACCESS_KEY: Joi.string().optional(),
  AWS_S3_BUCKET: Joi.string().optional(),
  
  // Kafka Configuration
  KAFKA_BROKERS: Joi.string().default('localhost:9092'),
  KAFKA_CLIENT_ID: Joi.string().default('ngear-platform'),
  
  // Rate Limiting
  RATE_LIMIT_MAX_REQUESTS: Joi.number().default(100),
  RATE_LIMIT_WINDOW_MS: Joi.number().default(15 * 60 * 1000), // 15 minutes
  
  // Logging
  LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'debug').default('info'),
  
  // Security
  BCRYPT_ROUNDS: Joi.number().default(12),
  ENCRYPTION_KEY: Joi.string().required(),
  
  // File Upload
  MAX_FILE_SIZE: Joi.number().default(10 * 1024 * 1024), // 10MB
  ALLOWED_FILE_TYPES: Joi.string().default('image/jpeg,image/png,image/gif,application/pdf'),
  
  // External Services
  PAYMENT_GATEWAY_URL: Joi.string().optional(),
  PAYMENT_GATEWAY_API_KEY: Joi.string().optional(),
  NOTIFICATION_SERVICE_URL: Joi.string().optional(),
});

const { error, value: envVars } = configSchema.validate(process.env, {
  allowUnknown: true,
  stripUnknown: true,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export interface Config {
  env: string;
  port: number;
  
  database: {
    url: string;
    host: string;
    port: number;
    name: string;
    username: string;
    password: string;
  };
  
  mongodb: {
    url: string;
  };
  
  redis: {
    host: string;
    port: number;
    password?: string;
  };
  
  jwt: {
    secret: string;
    expiresIn: string;
    refreshSecret: string;
    refreshExpiresIn: string;
  };
  
  oauth: {
    google: {
      clientId?: string;
      clientSecret?: string;
    };
  };
  
  email: {
    host: string;
    port: number;
    user: string;
    password: string;
  };
  
  aws: {
    region: string;
    accessKeyId?: string;
    secretAccessKey?: string;
    s3Bucket?: string;
  };
  
  kafka: {
    brokers: string;
    clientId: string;
  };
  
  rateLimit: {
    maxRequests: number;
    windowMs: number;
  };
  
  logging: {
    level: string;
  };
  
  security: {
    bcryptRounds: number;
    encryptionKey: string;
  };
  
  fileUpload: {
    maxSize: number;
    allowedTypes: string[];
  };
  
  externalServices: {
    paymentGateway?: {
      url: string;
      apiKey: string;
    };
    notificationService?: {
      url: string;
    };
  };
}

const config: Config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  
  database: {
    url: envVars.DATABASE_URL,
    host: envVars.DATABASE_HOST,
    port: envVars.DATABASE_PORT,
    name: envVars.DATABASE_NAME,
    username: envVars.DATABASE_USERNAME,
    password: envVars.DATABASE_PASSWORD,
  },
  
  mongodb: {
    url: envVars.MONGODB_URL,
  },
  
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    password: envVars.REDIS_PASSWORD,
  },
  
  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,
    refreshSecret: envVars.JWT_REFRESH_SECRET,
    refreshExpiresIn: envVars.JWT_REFRESH_EXPIRES_IN,
  },
  
  oauth: {
    google: {
      clientId: envVars.OAUTH_GOOGLE_CLIENT_ID,
      clientSecret: envVars.OAUTH_GOOGLE_CLIENT_SECRET,
    },
  },
  
  email: {
    host: envVars.SMTP_HOST,
    port: envVars.SMTP_PORT,
    user: envVars.SMTP_USER,
    password: envVars.SMTP_PASSWORD,
  },
  
  aws: {
    region: envVars.AWS_REGION,
    accessKeyId: envVars.AWS_ACCESS_KEY_ID,
    secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    s3Bucket: envVars.AWS_S3_BUCKET,
  },
  
  kafka: {
    brokers: envVars.KAFKA_BROKERS,
    clientId: envVars.KAFKA_CLIENT_ID,
  },
  
  rateLimit: {
    maxRequests: envVars.RATE_LIMIT_MAX_REQUESTS,
    windowMs: envVars.RATE_LIMIT_WINDOW_MS,
  },
  
  logging: {
    level: envVars.LOG_LEVEL,
  },
  
  security: {
    bcryptRounds: envVars.BCRYPT_ROUNDS,
    encryptionKey: envVars.ENCRYPTION_KEY,
  },
  
  fileUpload: {
    maxSize: envVars.MAX_FILE_SIZE,
    allowedTypes: envVars.ALLOWED_FILE_TYPES.split(','),
  },
  
  externalServices: {
    paymentGateway: envVars.PAYMENT_GATEWAY_URL && envVars.PAYMENT_GATEWAY_API_KEY ? {
      url: envVars.PAYMENT_GATEWAY_URL,
      apiKey: envVars.PAYMENT_GATEWAY_API_KEY,
    } : undefined,
    notificationService: envVars.NOTIFICATION_SERVICE_URL ? {
      url: envVars.NOTIFICATION_SERVICE_URL,
    } : undefined,
  },
};

export default config;