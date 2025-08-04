# NGEAR Platform

**Dynamic Multi-Tenant Loyalty, Engagement & Martech Platform - Zero-Code Configurable Solution for Enterprise Clients**

[![CI/CD Pipeline](https://github.com/creativewahed/ngear-platform/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/creativewahed/ngear-platform/actions/workflows/ci-cd.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)

## 🚀 Overview

NGEAR is a sophisticated, enterprise-grade, multi-tenant platform designed to revolutionize loyalty programs, customer engagement, and marketing technology. Built with modern microservices architecture, it offers zero-code configuration capabilities for rapid deployment and customization.

### Key Features

- **🏢 Multi-Tenant Architecture**: Complete tenant isolation with custom branding and configurations
- **🔐 Advanced Security**: JWT authentication, RBAC/ABAC, MFA, and comprehensive audit trails
- **⚙️ Zero-Code Configuration**: Visual drag-and-drop interfaces for rules, workflows, and app building
- **💰 Intelligent Wallet System**: Multi-currency support with fraud detection and compliance
- **🎁 Advanced Rewards Engine**: Real-time rule processing with A/B testing capabilities
- **📊 Real-Time Analytics**: Predictive insights with customizable dashboards
- **🔄 Seamless Integrations**: No-code API configurations and webhook management
- **📱 Cross-Platform Support**: Web, mobile, and API-first architecture

## 🏗️ Architecture

### Technology Stack

#### Backend
- **Framework**: Node.js with TypeScript and NestJS
- **Microservices**: Independent, scalable service architecture
- **API Gateway**: Centralized routing and authentication
- **Message Queue**: Apache Kafka for event processing
- **Caching**: Redis for high-performance data access

#### Databases
- **PostgreSQL**: Primary transactional database
- **MongoDB**: Document store for flexible schemas
- **Redis**: Cache layer and session storage
- **ClickHouse**: Real-time analytics database
- **Elasticsearch**: Full-text search and complex queries

#### Frontend
- **Framework**: React with TypeScript and Next.js
- **State Management**: Redux Toolkit with RTK Query
- **UI Components**: Custom design system with Tailwind CSS
- **Charts**: D3.js and Chart.js for visualizations

#### DevOps
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Kubernetes for container management
- **CI/CD**: GitHub Actions with automated testing
- **Monitoring**: Prometheus, Grafana, and ELK stack

### Microservices

| Service | Port | Description |
|---------|------|-------------|
| API Gateway | 3000 | Central routing and authentication |
| Auth Service | 3001 | Authentication and authorization |
| Tenant Service | 3002 | Multi-tenant management |
| User Service | 3003 | User and role management |
| Wallet Service | 3004 | Digital wallet and transactions |
| Rewards Service | 3005 | Rewards engine and rules |
| Redemption Service | 3006 | Multi-channel redemption |
| Analytics Service | 3007 | Real-time analytics and reporting |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm 8+
- Docker and Docker Compose
- Kubernetes cluster (for production)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/creativewahed/ngear-platform.git
   cd ngear-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm run bootstrap
   ```

3. **Start development environment**
   ```bash
   # Start all databases and services
   docker-compose up -d
   
   # Start services in development mode
   npm run dev
   ```

4. **Access services**
   - API Gateway: http://localhost:3000
   - Auth Service: http://localhost:3001
   - Admin Panel: http://localhost:3100
   - API Documentation: http://localhost:3000/api/docs

### Production Deployment

1. **Build and push images**
   ```bash
   npm run docker:build
   ```

2. **Deploy to Kubernetes**
   ```bash
   kubectl apply -f k8s/
   ```

## 📚 Core Modules

### 1. Authentication & Authorization
- Multi-factor authentication (MFA)
- Role-Based Access Control (RBAC)
- Attribute-Based Access Control (ABAC)
- JWT tokens with refresh mechanism
- Audit trails and session management

### 2. Multi-Tenant Management
- Complete tenant isolation
- Custom branding and themes
- Subscription management
- Feature toggles and limitations
- White-label configurations

### 3. Intelligent Wallet System
- Multi-currency virtual wallets
- Real-time transaction processing
- Fraud detection and prevention
- Compliance and regulatory features
- Cross-wallet transfers

### 4. Advanced Rewards Engine
- Visual drag-and-drop rule builder
- Complex conditional logic
- Real-time rule evaluation
- A/B testing capabilities
- Performance optimization

### 5. Comprehensive Redemption
- Multiple redemption channels
- Real-time inventory management
- Personalized recommendations
- Cross-channel tracking
- Partner integrations

### 6. Analytics & Reporting
- Real-time dashboards
- Predictive analytics
- Custom report builder
- Data visualization tools
- Automated alerting

## 🔧 Development

### Project Structure

```
ngear-platform/
├── packages/           # Shared packages
│   ├── shared/        # Common types and utilities
│   └── common/        # Shared components
├── services/          # Microservices
│   ├── auth/         # Authentication service
│   ├── tenant/       # Tenant management
│   ├── wallet/       # Wallet service
│   ├── rewards/      # Rewards engine
│   └── api-gateway/  # API Gateway
├── apps/             # Frontend applications
│   ├── admin-panel/  # Admin dashboard
│   ├── client-portal/ # Client interface
│   └── end-user-app/ # Consumer app
├── k8s/              # Kubernetes manifests
├── docker/           # Docker configurations
└── docs/             # Documentation
```

### Scripts

```bash
# Development
npm run dev              # Start all services in dev mode
npm run build           # Build all services
npm run test            # Run all tests
npm run lint            # Lint all code

# Docker
npm run docker:build   # Build Docker images
npm run docker:up      # Start with Docker Compose
npm run docker:down    # Stop Docker services

# Kubernetes
npm run k8s:deploy     # Deploy to Kubernetes
```

### Environment Variables

Create `.env` files in each service directory:

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=ngear_auth

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=password

# JWT
JWT_SECRET=your-super-secret-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Other services
AUTH_SERVICE_URL=http://localhost:3001
TENANT_SERVICE_URL=http://localhost:3002
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:e2e
```

### Performance Tests
```bash
npm run test:performance
```

## 📊 Monitoring

### Health Checks
- `/api/v1/health` - Service health status
- `/api/v1/health/ready` - Readiness probe
- `/api/v1/metrics` - Prometheus metrics

### Logging
- Structured logging with Winston
- Centralized log aggregation with ELK stack
- Correlation IDs for distributed tracing

### Monitoring Stack
- **Prometheus**: Metrics collection
- **Grafana**: Visualization and alerting
- **Elasticsearch**: Log storage and search
- **Kibana**: Log analysis and visualization

## 🔒 Security

### Authentication
- JWT tokens with short expiration
- Refresh token rotation
- Multi-factor authentication
- Session management

### Authorization
- Role-Based Access Control (RBAC)
- Attribute-Based Access Control (ABAC)
- Resource-level permissions
- Tenant isolation

### Data Protection
- Encryption at rest and in transit
- PII data anonymization
- GDPR compliance
- SOC 2 compliance ready

## 📈 Performance

### Targets
- **Response Time**: Sub-second for all API endpoints
- **Throughput**: Handle millions of events per day
- **Availability**: 99.9% uptime with automated failover
- **Scalability**: Support 1000+ tenants

### Optimization
- Redis caching for frequently accessed data
- Database query optimization
- CDN for static assets
- Horizontal pod autoscaling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Write comprehensive tests
- Use conventional commits
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [docs.ngear.app](https://docs.ngear.app)
- **Issues**: [GitHub Issues](https://github.com/creativewahed/ngear-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/creativewahed/ngear-platform/discussions)
- **Email**: support@ngear.app

## 🗺️ Roadmap

### Phase 1 (Current) - Foundation ✅
- [x] Core architecture and microservices
- [x] Authentication and authorization
- [x] Multi-tenant management
- [x] Basic wallet functionality
- [x] CI/CD pipeline

### Phase 2 - Advanced Features
- [ ] Advanced rewards engine with visual builder
- [ ] Comprehensive redemption system
- [ ] Real-time analytics dashboard
- [ ] Mobile applications
- [ ] Advanced integrations

### Phase 3 - AI & ML
- [ ] Predictive analytics
- [ ] Personalization engine
- [ ] Fraud detection
- [ ] Recommendation system
- [ ] Natural language processing

### Phase 4 - Enterprise
- [ ] Advanced compliance features
- [ ] White-label marketplace
- [ ] Advanced reporting
- [ ] Enterprise integrations
- [ ] Global deployment

---

**Built with ❤️ by the Creative Wahed Team**
