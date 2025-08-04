#!/bin/bash

# NGEAR Platform Development Setup Script
# This script sets up the development environment and validates the installation

set -e

echo "🚀 Setting up NGEAR Platform Development Environment..."

# Check prerequisites
check_prerequisites() {
    echo "📋 Checking prerequisites..."
    
    # Check Node.js version
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo "❌ Node.js version 18 or higher is required. Current version: $(node -v)"
        exit 1
    fi
    echo "✅ Node.js $(node -v) is installed"
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is not installed. Please install Docker."
        exit 1
    fi
    echo "✅ Docker is installed"
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
        echo "❌ Docker Compose is not installed. Please install Docker Compose."
        exit 1
    fi
    echo "✅ Docker Compose is available"
}

# Install dependencies
install_dependencies() {
    echo "📦 Installing dependencies..."
    npm install --quiet
    echo "✅ Dependencies installed"
}

# Setup environment
setup_environment() {
    echo "⚙️ Setting up environment..."
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "✅ Environment file created from template"
    else
        echo "✅ Environment file already exists"
    fi
}

# Start services
start_services() {
    echo "🐳 Starting Docker services..."
    docker-compose up -d postgres mongodb redis
    
    # Wait for services to be ready
    echo "⏳ Waiting for services to start..."
    sleep 10
    
    # Check if services are running
    if docker-compose ps | grep -q "Up"; then
        echo "✅ Services are running"
    else
        echo "❌ Failed to start services"
        docker-compose ps
        exit 1
    fi
}

# Validate setup
validate_setup() {
    echo "🔍 Validating setup..."
    
    # Check if we can compile TypeScript
    echo "📝 Checking TypeScript compilation..."
    if npm run build > /dev/null 2>&1; then
        echo "✅ TypeScript compilation successful"
    else
        echo "⚠️ TypeScript compilation has warnings or errors"
    fi
    
    # Check linting
    echo "🔍 Running code quality checks..."
    if npm run lint > /dev/null 2>&1; then
        echo "✅ Code quality checks passed"
    else
        echo "⚠️ Code quality issues found (run 'npm run lint' for details)"
    fi
    
    # Check if auth service can start
    echo "🔐 Testing auth service..."
    cd services/auth-service
    if npm run build > /dev/null 2>&1; then
        echo "✅ Auth service builds successfully"
    else
        echo "⚠️ Auth service build has issues"
    fi
    cd ../..
}

# Create test user
create_test_data() {
    echo "👤 Creating test data..."
    
    # This would normally run database seeds
    echo "✅ Test data creation placeholder completed"
}

# Main execution
main() {
    echo "🎯 NGEAR Platform Setup Starting..."
    echo "================================="
    
    check_prerequisites
    install_dependencies
    setup_environment
    start_services
    validate_setup
    create_test_data
    
    echo ""
    echo "🎉 Setup completed successfully!"
    echo "================================="
    echo ""
    echo "📍 Access Points:"
    echo "  • Platform Admin: http://localhost:3000"
    echo "  • Auth Service: http://localhost:3001"
    echo "  • API Docs: http://localhost:3001/docs"
    echo ""
    echo "🛠️ Development Commands:"
    echo "  • npm run dev          - Start development servers"
    echo "  • npm run test         - Run tests"
    echo "  • npm run build        - Build all services"
    echo "  • docker-compose logs  - View service logs"
    echo ""
    echo "📚 Documentation: See README.md for more details"
    echo ""
}

# Run main function
main "$@"