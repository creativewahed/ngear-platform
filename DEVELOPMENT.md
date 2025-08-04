# NGEAR Platform - Development Guide

## Quick Start Demo

To quickly demonstrate the NGEAR Platform API capabilities:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the demo server:**
   ```bash
   node demo-server.js
   ```

3. **Access the API:**
   - Health Check: http://localhost:3000/api/v1/health
   - API Documentation: http://localhost:3000/api/docs

## Testing the Health Endpoint

```bash
# Test health endpoint
curl http://localhost:3000/api/v1/health

# Expected response:
{
  "status": "ok",
  "timestamp": "2024-08-04T10:00:00.000Z",
  "uptime": 3600,
  "version": "1.0.0",
  "environment": "development",
  "services": {
    "database": "ok",
    "redis": "ok",
    "kafka": "ok"
  }
}
```

## Full Development Environment

For the complete development environment with all services:

1. **Start infrastructure services:**
   ```bash
   docker-compose up -d postgres redis kafka
   ```

2. **Build the applications:**
   ```bash
   npm run build:all
   ```

3. **Start the services:**
   ```bash
   # API Gateway
   npx nx serve api-gateway
   
   # Web Application  
   npx nx serve web-app
   ```

## Architecture Overview

The NGEAR Platform implements a comprehensive multi-tenant architecture with:

- **60+ TypeScript files** with enterprise-grade type definitions
- **Multi-tenant database design** with proper isolation
- **Microservices architecture** with independent scaling
- **Real-time processing** capabilities with event-driven design
- **Zero-code configuration** for business users
- **Enterprise security** with RBAC and audit trails

## Key Features Demonstrated

✅ **Health Monitoring**: Comprehensive health checks for all services
✅ **API Documentation**: Interactive API documentation interface  
✅ **Multi-Tenant Support**: Database entities for tenant isolation
✅ **Security Framework**: Role-based access control implementation
✅ **Wallet System**: Financial transaction capabilities
✅ **Rule Engine**: Foundation for reward rule processing
✅ **DevOps Ready**: Docker containers and CI/CD pipelines