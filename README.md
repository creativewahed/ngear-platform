# NGEAR Platform

Dynamic Multi-Tenant Loyalty, Engagement & Martech Platform - Zero-Code Configurable Solution for Enterprise Clients

## Overview

NGEAR is a sophisticated, multi-tenant, zero-code loyalty, engagement, and Martech platform designed for enterprise clients across various industries. This platform solves limitations of existing solutions by offering a highly configurable, scalable engine with advanced no-code capabilities.

## Architecture

### Core Components

- **API Gateway**: Centralized entry point for all microservices
- **Multi-Tenant Database**: PostgreSQL with tenant isolation
- **Caching Layer**: Redis for high-performance data access
- **Message Queue**: Apache Kafka for event processing
- **Frontend**: Next.js with multi-tenant routing
- **Microservices**: Independent, scalable service architecture

### Technology Stack

#### Backend
- **Framework**: Node.js with TypeScript and NestJS
- **Database**: PostgreSQL (primary), MongoDB (flexible schemas), Redis (cache)
- **Message Queue**: Apache Kafka
- **API Documentation**: Swagger/OpenAPI

#### Frontend
- **Framework**: Next.js with TypeScript
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS
- **UI Components**: Custom design system

#### DevOps
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Health checks and logging

## Getting Started

### Prerequisites

- Node.js 18.x or 20.x
- Docker and Docker Compose
- PostgreSQL 15+
- Redis 7+

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ngear-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development services**
   ```bash
   docker-compose up -d postgres redis kafka
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start the development servers**
   ```bash
   # Start API Gateway
   npx nx serve api-gateway
   
   # Start Web App (in another terminal)
   npx nx serve web-app
   ```

### Available Scripts

- `npm run build` - Build all applications
- `npm run test` - Run all tests
- `npm run lint` - Lint all projects
- `npm run serve` - Start development servers
- `npm run build:all` - Build all projects in parallel
- `npm run test:all` - Run all tests in parallel
- `npm run lint:all` - Lint all projects in parallel

## API Documentation

When running the development server, API documentation is available at:
- **Swagger UI**: http://localhost:3000/api/docs
- **Health Check**: http://localhost:3000/api/v1/health

## License

This project is licensed under the MIT License.
