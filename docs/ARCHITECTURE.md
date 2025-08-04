# NGEAR Platform Architecture

## Overview

NGEAR is a sophisticated, multi-tenant, zero-code loyalty, engagement, and Martech platform designed for enterprise clients. This document outlines the complete technical architecture and implementation details.

## System Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Apps   │    │  Admin Panel    │    │ Vendor Portals  │
│ (Web & Mobile)  │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  API Gateway    │
                    │  (Port 3000)    │
                    └─────────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Auth Service   │    │ Tenant Service  │    │  User Service   │
│  (Port 3001)    │    │  (Port 3002)    │    │  (Port 3003)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Databases     │
                    │ PostgreSQL      │
                    │ Redis           │
                    │ MongoDB         │
                    └─────────────────┘
```

### Core Components

#### 1. API Gateway (Port 3000)
- **Purpose**: Centralized entry point for all API requests
- **Features**:
  - Request routing to microservices
  - Authentication middleware
  - Rate limiting
  - CORS handling
  - Health checks

#### 2. Authentication Service (Port 3001)
- **Purpose**: Handle user authentication and authorization
- **Features**:
  - JWT token generation and validation
  - Multi-factor authentication
  - Role-based access control (RBAC)
  - Session management
  - Password encryption

#### 3. Tenant Management Service (Port 3002)
- **Purpose**: Manage multi-tenant functionality
- **Features**:
  - Tenant onboarding
  - Subdomain management
  - Tenant settings and configurations
  - Plan management
  - Resource isolation

#### 4. User Management Service (Port 3003)
- **Purpose**: Handle user lifecycle and management
- **Features**:
  - User registration and profiles
  - Role assignment
  - User activity tracking
  - Profile management

## Technology Stack

### Backend Services
- **Framework**: NestJS with TypeScript
- **Architecture**: Microservices
- **Database**: PostgreSQL (primary), MongoDB (flexible schemas), Redis (caching)
- **Authentication**: JWT with Passport.js
- **API Documentation**: Swagger/OpenAPI
- **Validation**: class-validator and class-transformer

### Frontend Applications
- **Framework**: Next.js with TypeScript
- **State Management**: Redux Toolkit
- **UI Framework**: Tailwind CSS
- **Form Handling**: React Hook Form
- **API Client**: Axios with React Query

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Kubernetes
- **CI/CD**: GitHub Actions
- **Monitoring**: Prometheus + Grafana
- **Logging**: ELK Stack

## Database Schema

### Core Tables

#### Tenants
```sql
CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(50) UNIQUE NOT NULL,
    domain VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'trial',
    plan VARCHAR(50) NOT NULL DEFAULT 'starter',
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    roles TEXT[] DEFAULT ARRAY['user'],
    status VARCHAR(50) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## API Endpoints

### Authentication Service
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Token refresh
- `GET /auth/profile` - Get user profile
- `POST /auth/logout` - User logout

### Tenant Service
- `GET /tenants` - List all tenants
- `GET /tenants/:id` - Get tenant by ID
- `GET /tenants/subdomain/:subdomain` - Get tenant by subdomain
- `POST /tenants` - Create new tenant
- `PUT /tenants/:id` - Update tenant
- `DELETE /tenants/:id` - Delete tenant

## Security Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (RBAC)
- Tenant isolation
- API rate limiting
- Input validation and sanitization

### Data Protection
- Password hashing with bcrypt
- Data encryption at rest
- HTTPS/TLS encryption in transit
- SQL injection prevention
- XSS protection

## Deployment

### Local Development
```bash
# Install dependencies
npm install

# Start databases
docker-compose up -d postgres redis mongodb

# Start services
npm run dev
```

### Production Deployment
```bash
# Build and deploy with Kubernetes
kubectl apply -f k8s/

# Or use Docker Compose
docker-compose up -d
```

## Monitoring and Observability

### Health Checks
- `/health` - Service health status
- `/health/ready` - Readiness probe
- `/health/live` - Liveness probe

### Metrics
- Application metrics with Prometheus
- Custom business metrics
- Performance monitoring
- Error tracking

### Logging
- Structured logging with Winston
- Centralized logging with ELK stack
- Request/response logging
- Error logging with stack traces

## Scalability Considerations

### Horizontal Scaling
- Stateless microservices
- Load balancer support
- Auto-scaling with Kubernetes HPA
- Database connection pooling

### Performance Optimization
- Redis caching layer
- Query optimization
- CDN for static assets
- Lazy loading and pagination

## Development Guidelines

### Code Quality
- TypeScript for type safety
- ESLint and Prettier for code formatting
- Unit and integration testing
- Code review requirements

### API Design
- RESTful API principles
- Consistent error handling
- API versioning strategy
- Comprehensive documentation

## Future Enhancements

### Planned Features
- Advanced analytics dashboard
- Real-time notifications
- Mobile SDK
- Third-party integrations
- Machine learning capabilities

### Technical Improvements
- GraphQL API layer
- Event sourcing
- CQRS pattern implementation
- Advanced monitoring and alerting