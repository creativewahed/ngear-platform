# NGEAR Platform

NGEAR - Dynamic Multi-Tenant Loyalty, Engagement & Martech Platform - Zero-Code Configurable Solution for Enterprise Clients

## 🚀 Overview

NGEAR Platform is a comprehensive, enterprise-grade solution designed to revolutionize loyalty programs, customer engagement, and marketing technology. Built with a sophisticated multi-tenant architecture, it offers unparalleled scalability, security, and customization capabilities for businesses of all sizes.

## ✨ Key Features

### 🏗️ Core Architecture
- **Multi-Tenant Architecture**: Support for unlimited clients with complete data isolation
- **Microservices Design**: Scalable, independent services for optimal performance
- **Real-time Processing**: Event-driven architecture with Apache Kafka
- **Zero-Code Configuration**: Visual builders for non-technical users
- **Enterprise Security**: OAuth 2.0, JWT, RBAC/ABAC, and comprehensive audit logging

### 📋 Essential Modules

#### 🎯 Client Onboarding Module
- Guided multi-step onboarding workflow
- KYC verification integration
- API configuration wizard
- Program setup and customization

#### 👥 Multi-User & Role Management
- Role-Based Access Control (RBAC)
- Attribute-Based Access Control (ABAC)
- Maker-checker workflows
- Multi-level approval hierarchies

#### 🔌 API Integration & Data Ingestion Engine
- No-code API configuration interface
- Real-time data mapping and transformation
- Multiple data source connectors
- Webhook management system

#### 🎁 Advanced Rewards Rule Engine
- Visual drag-and-drop rule builder
- Complex conditional logic support
- Multi-criteria evaluation engine
- A/B testing for rule variations

#### 💰 Intelligent Wallet Management
- Virtual wallet system with multiple currencies
- Prepaid and postpaid models
- Transaction history and reconciliation
- Fraud detection and prevention

#### 🛍️ Comprehensive Redemption Engine
- Multiple redemption channels
- Real-time inventory management
- Dynamic pricing and availability
- Personalized recommendation engine

#### 📊 Analytics & Reporting Engine
- Real-time dashboards and KPIs
- Predictive analytics and insights
- Custom report builder
- Automated alerting system

## 🛠️ Technology Stack

### Backend
- **Framework**: Node.js with TypeScript and NestJS
- **Architecture**: Microservices with API Gateway
- **Databases**: PostgreSQL, MongoDB, Redis
- **Message Queue**: Apache Kafka
- **Search**: Elasticsearch
- **Authentication**: OAuth 2.0, JWT, Passport.js

### Frontend
- **Framework**: React with TypeScript and Next.js
- **State Management**: Redux Toolkit with RTK Query
- **UI Components**: Tailwind CSS with Headless UI
- **Charts**: Recharts and D3.js

### DevOps & Infrastructure
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus, Grafana
- **Logging**: ELK Stack

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/creativewahed/ngear-platform.git
   cd ngear-platform
   ```

2. **Run the setup script**
   ```bash
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

3. **Start the development environment**
   ```bash
   # Start infrastructure services
   docker-compose -f docker-compose.dev.yml up -d
   
   # Install dependencies
   npm install
   
   # Start the API Gateway
   npm run start:dev
   ```

4. **Access the application**
   - API Gateway: http://localhost:3000
   - API Documentation: http://localhost:3000/api/docs
   - Frontend: http://localhost:3001 (coming soon)

### Environment Configuration

Copy `.env.example` to `.env` and update the configuration:

```bash
cp .env.example .env
```

Key configuration options:
- Database connections (PostgreSQL, MongoDB, Redis)
- JWT secrets and expiration times
- External service integrations
- Security settings

## 📖 API Documentation

The platform provides comprehensive API documentation through Swagger/OpenAPI:

- **Development**: http://localhost:3000/api/docs
- **Interactive Testing**: Available through Swagger UI
- **Authentication**: Bearer token required for protected endpoints

### Core API Endpoints

#### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/refresh` - Refresh access token

#### Tenants
- `GET /api/v1/tenants` - List all tenants
- `POST /api/v1/tenants` - Create new tenant
- `GET /api/v1/tenants/:id` - Get tenant details
- `PUT /api/v1/tenants/:id` - Update tenant
- `DELETE /api/v1/tenants/:id` - Delete tenant

#### Users & Roles
- User management endpoints
- Role and permission management
- Multi-tenant user isolation

#### Wallets & Transactions
- Wallet creation and management
- Transaction processing
- Balance tracking and reconciliation

#### Reward Rules
- Rule creation and management
- Condition and action configuration
- Rule execution and monitoring

## 🏗️ Architecture

### Multi-Tenant Design

The platform implements a sophisticated multi-tenant architecture:

```
┌─────────────────────────────────────────────────────┐
│                 API Gateway                         │
├─────────────────────────────────────────────────────┤
│  Authentication  │  Authorization  │  Rate Limiting  │
├─────────────────────────────────────────────────────┤
│          Tenant Context Resolution                  │
├─────────────────────────────────────────────────────┤
│  Auth Service  │  User Service  │  Tenant Service   │
├─────────────────────────────────────────────────────┤
│ Wallet Service │ Rule Engine   │  Product Service   │
├─────────────────────────────────────────────────────┤
│              Event Bus (Apache Kafka)              │
├─────────────────────────────────────────────────────┤
│  PostgreSQL   │    MongoDB    │      Redis         │
│ (Relational)  │  (Documents)  │    (Cache)         │
└─────────────────────────────────────────────────────┘
```

### Data Isolation

Each tenant's data is completely isolated through:
- Database-level tenant scoping
- Row-level security policies
- Encrypted data at rest and in transit
- Separate caching namespaces

### Security Model

- **Authentication**: OAuth 2.0 with JWT tokens
- **Authorization**: RBAC and ABAC with fine-grained permissions
- **Data Protection**: AES-256 encryption, secure key management
- **Audit Logging**: Comprehensive activity tracking
- **Rate Limiting**: Per-tenant and per-user limits

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm test

# Integration tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Test Structure

- **Unit Tests**: Service and utility function testing
- **Integration Tests**: API endpoint and database testing
- **E2E Tests**: Full application workflow testing
- **Performance Tests**: Load and stress testing

## 🚀 Deployment

### Docker Deployment

```bash
# Build production images
docker-compose build

# Start production stack
docker-compose up -d

# Scale services
docker-compose up -d --scale api-gateway=3
```

### Kubernetes Deployment

```bash
# Apply Kubernetes manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get pods -n ngear-platform

# View logs
kubectl logs -f deployment/api-gateway -n ngear-platform
```

### Environment-Specific Configurations

- **Development**: `.env` with debug settings
- **Staging**: `.env.staging` with staging configurations
- **Production**: `.env.production` with production settings

## 📊 Monitoring & Observability

### Metrics & Monitoring
- **Prometheus**: Metrics collection
- **Grafana**: Dashboards and alerting
- **Health Checks**: Application and infrastructure monitoring

### Logging
- **Structured Logging**: JSON format with correlation IDs
- **Log Aggregation**: ELK stack for centralized logging
- **Log Levels**: Configurable per environment

### Distributed Tracing
- **Request Tracing**: End-to-end request tracking
- **Performance Monitoring**: Latency and throughput analysis
- **Error Tracking**: Automated error detection and alerting

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Standards

- **TypeScript**: Strict typing enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Conventional Commits**: Standardized commit messages

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Documentation
- [API Reference](docs/api.md)
- [Architecture Guide](docs/architecture.md)
- [Deployment Guide](docs/deployment.md)
- [Security Guide](docs/security.md)

### Community & Support
- **GitHub Issues**: Bug reports and feature requests
- **Discussions**: Community questions and discussions
- **Email**: support@ngear.com

### Enterprise Support
For enterprise customers, we offer:
- 24/7 technical support
- Dedicated customer success manager
- Custom feature development
- On-premises deployment assistance

---

## 🌟 Key Benefits

### For Businesses
- **Reduced Time-to-Market**: Deploy loyalty programs in days, not months
- **Cost Efficiency**: No need for custom development or maintenance
- **Scalability**: Handle millions of users and transactions
- **Flexibility**: Adapt to changing business requirements quickly

### For Developers
- **Modern Architecture**: Built with latest technologies and best practices
- **Comprehensive APIs**: RESTful and GraphQL APIs with excellent documentation
- **Easy Integration**: SDKs and webhook support for seamless integration
- **Extensibility**: Plugin architecture for custom functionality

### For End Users
- **Seamless Experience**: Intuitive interfaces across web and mobile
- **Real-time Updates**: Instant notifications and balance updates
- **Personalization**: AI-powered recommendations and experiences
- **Multi-channel Access**: Consistent experience across all touchpoints

---

Built with ❤️ by the NGEAR Platform Team
