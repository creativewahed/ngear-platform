# NGEAR Platform

🚀 **NGEAR** - Dynamic Multi-Tenant Loyalty, Engagement & Martech Platform

A sophisticated, enterprise-grade platform that enables zero-code configuration for loyalty programs, customer engagement, and marketing automation across multiple tenants.

## 🏗️ Architecture Overview

### Core Services
- **Authentication Service** - JWT-based authentication, RBAC, user management
- **Tenant Management** - Multi-tenant architecture with isolated data
- **User Service** - User profiles, roles, and permissions
- **API Gateway** - Centralized routing, rate limiting, and security
- **Configuration Service** - Dynamic configuration management

### Frontend Applications
- **Platform Admin** - Super admin dashboard for platform management
- **Client Portal** - White-label tenant administration interface
- **Mobile App** - React Native application for end users

### Technology Stack
- **Backend**: Node.js, TypeScript, NestJS, Express
- **Frontend**: React, Next.js, TypeScript, Tailwind CSS
- **Databases**: PostgreSQL, MongoDB, Redis
- **Infrastructure**: Docker, Kubernetes, GitHub Actions
- **Testing**: Jest, Supertest, Playwright

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- Git

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

3. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. **Start the development environment**
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database (port 5432)
- MongoDB (port 27017)
- Redis (port 6379)
- Auth Service (port 3001)
- Platform Admin (port 3000)

5. **Initialize the database**
```bash
npm run db:migrate
npm run db:seed
```

6. **Access the applications**
- Platform Admin: http://localhost:3000
- Auth Service API: http://localhost:3001
- API Documentation: http://localhost:3001/docs

## 📋 Features

### ✅ Implemented
- [x] Multi-tenant architecture foundation
- [x] Authentication & Authorization (JWT, RBAC)
- [x] User Management with role-based permissions
- [x] Platform Admin Dashboard
- [x] Docker containerization
- [x] CI/CD pipeline with GitHub Actions
- [x] Database migrations and seeding
- [x] API documentation with Swagger
- [x] Comprehensive testing setup

### 🚧 In Development
- [ ] Tenant Management Service
- [ ] API Gateway with rate limiting
- [ ] Client Portal (white-label)
- [ ] Rewards Rule Engine
- [ ] Wallet Management
- [ ] Analytics Dashboard

### 📅 Planned
- [ ] Redemption Engine
- [ ] E-Voucher System
- [ ] Cashback Module
- [ ] Drag-and-Drop App Builder
- [ ] Advanced Analytics
- [ ] Mobile Applications

## 🏛️ Project Structure

```
ngear-platform/
├── apps/                          # Frontend applications
│   ├── platform-admin/           # Platform administration dashboard
│   ├── client-portal/            # Client-specific admin portal
│   └── mobile-app/              # React Native mobile app
├── services/                     # Backend microservices
│   ├── auth-service/            # Authentication & authorization
│   ├── tenant-service/          # Tenant management
│   ├── user-service/            # User management
│   ├── api-gateway/             # API routing and security
│   └── config-service/          # Configuration management
├── libs/                        # Shared libraries
│   ├── shared/                  # Common types and utilities
│   ├── auth/                    # Authentication utilities
│   ├── tenant/                  # Tenant-specific utilities
│   ├── user/                    # User management utilities
│   └── ui/                      # Shared UI components
├── infrastructure/              # Infrastructure and deployment
│   ├── database/               # Database scripts and migrations
│   ├── kubernetes/             # K8s manifests
│   └── scripts/                # Utility scripts
└── docs/                       # Documentation
```

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm run test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

### Test Structure
- **Unit Tests**: Service logic and utilities
- **Integration Tests**: API endpoints and database operations
- **E2E Tests**: Full user workflows
- **Security Tests**: Authentication and authorization

## 🔧 Development

### Available Scripts
```bash
# Development
npm run dev              # Start all services in development mode
npm run build           # Build all applications and services
npm run lint            # Run ESLint on all projects
npm run format          # Format code with Prettier

# Database
npm run db:migrate      # Run database migrations
npm run db:seed         # Seed database with test data
npm run db:reset        # Reset database (migrate + seed)

# Docker
npm run docker:build    # Build Docker images
npm run docker:up       # Start Docker services
npm run docker:down     # Stop Docker services
```

### Code Quality
- **ESLint** - Code linting and style enforcement
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks
- **TypeScript** - Type safety and development experience

## 🔐 Security

### Authentication
- JWT-based authentication with refresh tokens
- Role-Based Access Control (RBAC)
- Attribute-Based Access Control (ABAC)
- Multi-factor authentication support

### Data Protection
- Encryption at rest and in transit
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection

### Compliance
- GDPR compliance features
- SOC 2 Type II considerations
- PCI DSS compliance for payment processing
- Audit logging and monitoring

## 📊 Monitoring

### Health Checks
- Service health endpoints
- Database connectivity monitoring
- Redis connection monitoring
- External service dependency checks

### Logging
- Structured logging with Winston
- Centralized log aggregation
- Error tracking and alerting
- Performance monitoring

### Metrics
- Prometheus metrics collection
- Grafana dashboards
- Custom business metrics
- Real-time monitoring

## 🚀 Deployment

### Docker Deployment
```bash
# Build and deploy with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

### Kubernetes Deployment
```bash
# Deploy to Kubernetes
kubectl apply -f infrastructure/kubernetes/
```

### CI/CD Pipeline
- Automated testing on all PRs
- Security scanning with Trivy
- Docker image building and pushing
- Automated deployment to staging/production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript and ESLint configurations
- Write tests for new features
- Update documentation for API changes
- Follow conventional commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- **Email**: support@ngear.com
- **Documentation**: [docs.ngear.com](https://docs.ngear.com)
- **Issues**: [GitHub Issues](https://github.com/creativewahed/ngear-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/creativewahed/ngear-platform/discussions)

## 🗺️ Roadmap

### Phase 1 (Current) - Foundation
- ✅ Core architecture setup
- ✅ Authentication system
- ✅ Basic admin dashboard
- 🚧 Tenant management
- 🚧 API Gateway

### Phase 2 - Core Features
- 📅 Rewards engine
- 📅 Wallet system
- 📅 Basic analytics
- 📅 Client portals

### Phase 3 - Advanced Features
- 📅 Redemption engine
- 📅 E-voucher system
- 📅 Advanced analytics
- 📅 Mobile applications

### Phase 4 - Enterprise Features
- 📅 AI-powered recommendations
- 📅 Advanced reporting
- 📅 Third-party integrations
- 📅 White-label solutions

---

Built with ❤️ by the NGEAR Team
