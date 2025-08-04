import { Config } from 'jest';

const config: Config = {
  displayName: 'auth-service',
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/main.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapping: {
    '^@ngear/shared/(.*)$': '<rootDir>/../../libs/shared/src/$1',
    '^@ngear/shared$': '<rootDir>/../../libs/shared/src/index.ts',
  },
};

export default config;