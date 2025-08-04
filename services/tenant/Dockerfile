# Multi-stage build for Tenant Service
FROM node:18-alpine AS base

# Install dumb-init and security updates
RUN apk add --no-cache dumb-init && \
    apk upgrade

# Create app directory
WORKDIR /app

# Copy root package files
COPY package*.json ./
COPY lerna.json ./

# Copy shared package
COPY packages/shared ./packages/shared

# Copy tenant service
COPY services/tenant ./services/tenant

# Install dependencies
RUN npm install

# Build shared package
RUN npm run build --workspace=@ngear/shared

# Build tenant service
RUN npm run build --workspace=@ngear/tenant-service

# Production stage
FROM node:18-alpine AS production

# Install dumb-init
RUN apk add --no-cache dumb-init

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

# Set working directory
WORKDIR /app

# Copy built application from base stage
COPY --from=base --chown=nestjs:nodejs /app/services/tenant/dist ./dist
COPY --from=base --chown=nestjs:nodejs /app/services/tenant/package*.json ./
COPY --from=base --chown=nestjs:nodejs /app/node_modules ./node_modules

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3002/api/v1/health/live || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/main.js"]