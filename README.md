# NGEAR Platform

NGEAR is a sophisticated, multi-tenant, zero-code loyalty, engagement, and Martech platform designed for enterprise clients across various industries. This platform solves limitations of existing solutions by offering a highly configurable, scalable engine with advanced no-code capabilities.

## 🏗️ Architecture Overview

### Multi-Tenant Architecture
- **Platform Owner Panel**: Super admin, product teams, tech teams, operations, finance, program management, configuration teams
- **Client-Specific Panels**: White-label branding with custom themes and configurations  
- **Vendor Management Panels**: Supplier and partner management interfaces
- **End-User Portals**: Consumer-facing web and mobile applications
- **Organization Portals**: B2B client interfaces

### Core Modules
- **Client Onboarding**: Guided multi-step workflows with KYC verification
- **Multi-User & Role Management**: RBAC/ABAC with maker-checker workflows
- **API Integration & Data Ingestion**: No-code API configuration with real-time data mapping
- **Master Schema Framework**: Dynamic schema generation and management
- **Advanced Rewards Rule Engine**: Visual drag-and-drop rule builder
- **Intelligent Wallet Management**: Virtual wallet system with multiple currencies
- **Comprehensive Redemption Engine**: Multiple redemption channels
- **Smart Layer Merchandise Module**: Multi-vendor product catalog management
- **Smart Layer E-Voucher Module**: Digital voucher creation and management
- **Advanced Cashback Module**: Bank transfer and UPI payment integration
- **Drag-and-Drop App Builder**: Visual web and mobile app creation
- **Analytics & Reporting Engine**: Real-time dashboards and predictive analytics

## 🚀 Technology Stack

### Backend
- **Framework**: Node.js with TypeScript and NestJS
- **Architecture**: Microservices with API Gateway
- **Message Queue**: Apache Kafka for event processing
- **Caching**: Redis for high-performance data access

### Database
- **Primary**: PostgreSQL for transactional data
- **Document Store**: MongoDB for flexible schemas  
- **Cache**: Redis for session and frequently accessed data
- **Search**: Elasticsearch for complex queries and full-text search

### Frontend
- **Framework**: React with TypeScript and Next.js
- **State Management**: Redux Toolkit with RTK Query
- **Styling**: Tailwind CSS with custom design system
- **Charts**: Chart.js for data visualizations

### DevOps & Infrastructure
- **Containerization**: Docker with multi-stage builds
- **Orchestration**: Kubernetes for container management
- **CI/CD**: GitHub Actions with automated testing
- **Monitoring**: Prometheus, Grafana, and ELK stack

## 📦 Project Structure

```
ngear-platform/
├── packages/                    # Shared packages
│   ├── types/                  # TypeScript type definitions
│   ├── shared/                 # Shared utilities and helpers
│   └── database/               # Database layer with Prisma ORM
├── apps/                       # Applications
│   ├── api-gateway/           # API Gateway service
│   ├── auth-service/          # Authentication service
│   ├── tenant-service/        # Tenant management service
│   ├── user-service/          # User management service
│   └── frontend/              # Frontend applications
│       ├── admin-panel/       # Admin panel (Next.js)
│       └── client-portal/     # Client portal (Next.js)
├── docker-compose.yml         # Development environment
└── .github/workflows/         # CI/CD pipelines
```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ and npm 9+
- Docker and Docker Compose
- PostgreSQL 15+
- Redis 7+

### Quick Start

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

3. **Start infrastructure services**
   ```bash
   docker-compose up -d
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Set up database**
   ```bash
   cd packages/database
   npx prisma migrate dev
   npx prisma db seed
   ```

6. **Build packages**
   ```bash
   npm run build
   ```

7. **Start development servers**
   ```bash
   npm run dev
   ```

### Available Services

- **API Gateway**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api/docs
- **Admin Panel**: http://localhost:3001
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379
- **MongoDB**: localhost:27017
- **Elasticsearch**: localhost:9200
- **Kafka**: localhost:9092

## 🔐 Security Features

- **Multi-factor Authentication (MFA)**
- **Role-based Access Control (RBAC)**
- **Attribute-based Access Control (ABAC)**
- **Data encryption at rest and in transit**
- **Audit logging and compliance**
- **Rate limiting and throttling**
- **SQL injection and XSS protection**

## 📊 Key Features

### Enterprise-Grade Scalability
- Supports 1000+ tenants
- Sub-second response times
- 99.9% uptime with automated failover
- Real-time processing of millions of events per day

### No-Code Capabilities
- Visual rule builder for rewards
- Drag-and-drop app creation
- API integration without coding
- Dynamic schema management
- Custom workflow creation

### Advanced Analytics
- Real-time dashboards and KPIs
- Predictive analytics and insights
- Custom report builder
- Automated alerting system
- Machine learning-based segmentation

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

Run tests with coverage:
```bash
npm run test:cov
```

Run E2E tests:
```bash
npm run test:e2e
```

## 📋 Available Scripts

- `npm run dev` - Start development servers
- `npm run build` - Build all packages and applications
- `npm run start` - Start production servers
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run clean` - Clean build artifacts
- `npm run docker:build` - Build Docker images
- `npm run docker:up` - Start Docker services
- `npm run docker:down` - Stop Docker services

## 🚀 Deployment

### Docker Deployment
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Kubernetes Deployment
```bash
kubectl apply -f k8s/
```

## 📝 API Documentation

Interactive API documentation is available at `/api/docs` when the API Gateway is running.

### Authentication
All protected endpoints require a Bearer token:
```
Authorization: Bearer <your-jwt-token>
```

### Multi-Tenancy
Specify tenant using either:
- Subdomain: `{tenant}.yourdomain.com`
- Header: `X-Tenant-ID: {tenant-id}`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript strict mode
- Use conventional commit messages
- Maintain test coverage above 80%
- Follow ESLint and Prettier configurations
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For support and questions:
- Create an issue in this repository
- Contact the development team
- Check the documentation at `/api/docs`

## 🗓️ Roadmap

### Phase 1 (Current)
- ✅ Core platform foundation
- ✅ Multi-tenant architecture
- ✅ Basic authentication and authorization
- ✅ API Gateway setup
- ✅ Database schema design

### Phase 2 (Next)
- 🔄 Advanced rule engine implementation
- 🔄 Real-time event processing
- 🔄 Mobile app SDKs
- 🔄 Advanced analytics dashboards
- 🔄 AI-powered recommendations

### Phase 3 (Future)
- 📋 Machine learning integration
- 📋 Advanced fraud detection
- 📋 Blockchain integration
- 📋 Advanced compliance features
- 📋 Global expansion support

---

**NGEAR Platform** - Transforming loyalty and engagement through innovative technology.
