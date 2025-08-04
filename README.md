# NGEAR Platform

NGEAR - Dynamic Multi-Tenant Loyalty, Engagement & Martech Platform - Zero-Code Configurable Solution for Enterprise Clients

## Overview

NGEAR is a sophisticated, multi-tenant, zero-code loyalty, engagement, and Martech platform designed for enterprise clients across various industries. The platform addresses limitations of existing solutions by offering a highly configurable, scalable engine with advanced no-code capabilities.

## Architecture

### Multi-Tenant Architecture
- **Platform Owner Panel**: Super admin, product teams, tech teams, operations, finance, program management, configuration teams
- **Client-Specific Panels**: White-label branding with custom themes and configurations
- **Vendor Management Panels**: Supplier and partner management interfaces
- **End-User Portals**: Consumer-facing web and mobile applications
- **Organization Portals**: B2B client interfaces

### Technology Stack

#### Backend
- **Framework**: Node.js with TypeScript and NestJS
- **Database**: PostgreSQL (primary), MongoDB (flexible schemas), Redis (caching)
- **Message Queue**: Apache Kafka for event processing
- **Search**: Elasticsearch for complex queries
- **API**: RESTful APIs with GraphQL support

#### Frontend
- **Framework**: React with TypeScript and Next.js
- **State Management**: Redux Toolkit with RTK Query
- **UI Components**: Custom design system with Tailwind CSS
- **Mobile**: React Native for cross-platform mobile apps

#### DevOps
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Kubernetes for container management
- **CI/CD**: GitHub Actions with automated testing
- **Monitoring**: Prometheus, Grafana, and ELK stack

## Services

### Core Services
1. **Authentication Service** (`services/auth`) - User authentication and authorization
2. **Tenant Service** (`services/tenant`) - Multi-tenant management
3. **User Service** (`services/user`) - User and role management
4. **API Gateway** (`services/api-gateway`) - Centralized routing and authentication
5. **Wallet Service** (`services/wallet`) - Virtual wallet and transaction management
6. **Rule Engine Service** (`services/rule-engine`) - Business rules processing
7. **Notification Service** (`services/notification`) - Multi-channel notifications
8. **Analytics Service** (`services/analytics`) - Real-time analytics and reporting

### Shared Libraries
- **@ngear/shared** (`packages/shared`) - Common utilities, types, and interfaces

## Quick Start

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- PostgreSQL, MongoDB, Redis

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/creativewahed/ngear-platform.git
   cd ngear-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development environment**
   ```bash
   # Start all services with Docker Compose
   docker-compose up -d

   # Or run services individually
   npm run dev
   ```

4. **Access the services**
   - API Gateway: http://localhost:3000
   - Auth Service: http://localhost:3001
   - Admin Panel: http://localhost:3100
   - Client Portal: http://localhost:3200

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://ngear_user:ngear_password@localhost:5432/ngear_platform
MONGODB_URL=mongodb://ngear_user:ngear_password@localhost:27017/ngear_platform
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=1h
REFRESH_TOKEN_EXPIRES_IN=7d

# Kafka
KAFKA_BROKERS=localhost:9092

# Elasticsearch
ELASTICSEARCH_URL=http://localhost:9200

# Email (for notifications)
EMAIL_SERVICE=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## API Documentation

Each service provides Swagger documentation:

- Auth Service: http://localhost:3001/api/docs
- Tenant Service: http://localhost:3002/api/docs
- User Service: http://localhost:3003/api/docs
- Wallet Service: http://localhost:3004/api/docs

## Testing

```bash
# Run all tests
npm run test

# Run tests for specific service
npm run test --workspace=@ngear/auth-service

# Run end-to-end tests
npm run test:e2e
```

## Building

```bash
# Build all packages
npm run build

# Build specific service
npm run build --workspace=@ngear/auth-service
```

## Deployment

### Docker
```bash
# Build all images
docker-compose build

# Deploy with Docker Compose
docker-compose up -d
```

### Kubernetes
```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/
```

## Monitoring

- **Health Checks**: Each service provides health endpoints at `/api/v1/health`
- **Metrics**: Prometheus metrics available at `/metrics`
- **Logs**: Structured JSON logging with correlation IDs

## Security

- **Authentication**: JWT-based authentication with refresh tokens
- **Authorization**: Role-based access control (RBAC) and Attribute-based access control (ABAC)
- **Data Protection**: Encryption at rest and in transit
- **Rate Limiting**: Configurable rate limits per endpoint
- **Security Headers**: Helmet.js for security headers
- **Input Validation**: Class-validator for request validation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation in the `docs/` directory
