#!/bin/bash

# NGEAR Platform Setup Script

set -e

echo "🚀 Setting up NGEAR Platform..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2)
MAJOR_VERSION=$(echo $NODE_VERSION | cut -d'.' -f1)

if [ "$MAJOR_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or higher is required. Current version: $NODE_VERSION"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Copy environment file
if [ ! -f .env ]; then
    echo "📄 Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your configuration"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Start development services
echo "🐳 Starting development services with Docker..."
docker-compose -f docker-compose.dev.yml up -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check if PostgreSQL is ready
echo "🔍 Checking PostgreSQL connection..."
until docker exec ngear-postgres-dev pg_isready -U ngear_user -d ngear_platform; do
    echo "Waiting for PostgreSQL..."
    sleep 2
done

# Check if MongoDB is ready
echo "🔍 Checking MongoDB connection..."
until docker exec ngear-mongodb-dev mongosh --eval "db.adminCommand('ping')" ngear_platform --quiet; do
    echo "Waiting for MongoDB..."
    sleep 2
done

# Check if Redis is ready
echo "🔍 Checking Redis connection..."
until docker exec ngear-redis-dev redis-cli ping; do
    echo "Waiting for Redis..."
    sleep 2
done

echo "✅ All services are ready!"

echo "🏗️  Building the application..."
npm run build

echo "🎉 Setup completed successfully!"
echo ""
echo "📚 Next steps:"
echo "  1. Update your .env file with proper configuration"
echo "  2. Run 'npm run start:dev' to start the API Gateway"
echo "  3. Visit http://localhost:3000/api/docs for API documentation"
echo ""
echo "🔧 Useful commands:"
echo "  - Start development: npm run start:dev"
echo "  - Run tests: npm test"
echo "  - Stop services: docker-compose -f docker-compose.dev.yml down"
echo "  - View logs: docker-compose -f docker-compose.dev.yml logs -f"