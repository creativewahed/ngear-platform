# Multi-stage Dockerfile for API Gateway
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY lerna.json ./
COPY packages/ ./packages/
COPY apps/api-gateway/ ./apps/api-gateway/

# Install dependencies
RUN npm ci

# Build packages
RUN npx lerna run build --scope="@ngear/types"
RUN npx lerna run build --scope="@ngear/shared"
RUN npx lerna run build --scope="@ngear/database"

# Build API Gateway
RUN cd apps/api-gateway && npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy built application
COPY --from=builder /app/apps/api-gateway/dist ./dist
COPY --from=builder /app/apps/api-gateway/package*.json ./
COPY --from=builder /app/packages ./packages

# Install production dependencies only
RUN npm ci --only=production

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Change ownership of the app directory
RUN chown -R nestjs:nodejs /app
USER nestjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/v1/health || exit 1

# Start the application
CMD ["node", "dist/main"]