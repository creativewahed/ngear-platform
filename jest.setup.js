// Global test setup
process.env.NODE_ENV = 'test';

// Mock environment variables for testing
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.JWT_REFRESH_SECRET = 'test-jwt-refresh-secret';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/ngear_test';
process.env.MONGODB_URL = 'mongodb://localhost:27017/ngear_test';
process.env.REDIS_HOST = 'localhost';
process.env.ENCRYPTION_KEY = 'test-encryption-key-32-characters';

// Suppress console output during tests unless explicitly enabled
if (!process.env.VERBOSE_TESTS) {
  global.console = {
    ...console,
    log: jest.fn(),
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };
}