module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/packages', '<rootDir>/apps', '<rootDir>/__tests__'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts',
  ],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'packages/**/*.ts',
    'apps/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/dist/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapping: {
    '^@ngear/types$': '<rootDir>/packages/types/src/index.ts',
    '^@ngear/shared$': '<rootDir>/packages/shared/src/index.ts',
    '^@ngear/config$': '<rootDir>/packages/config/src/index.ts',
    '^@ngear/database$': '<rootDir>/packages/database/src/index.ts',
    '^@ngear/auth$': '<rootDir>/packages/auth/src/index.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testTimeout: 10000,
};