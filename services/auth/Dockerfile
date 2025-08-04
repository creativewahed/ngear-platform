# Multi-stage build for Node.js service
FROM node:18-alpine as base

# Install build dependencies
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY lerna.json ./
COPY packages/ ./packages/
COPY services/auth/package*.json ./services/auth/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM base as development
RUN npm ci
COPY services/auth/ ./services/auth/
WORKDIR /app/services/auth
EXPOSE 3001
CMD ["npm", "run", "start:dev"]

# Build stage
FROM base as build
RUN npm ci
COPY services/auth/ ./services/auth/
WORKDIR /app/services/auth
RUN npm run build

# Production stage
FROM node:18-alpine as production
RUN apk add --no-cache dumb-init
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/services/auth/dist ./dist
COPY --from=build /app/services/auth/package*.json ./
USER node
EXPOSE 3001
CMD ["dumb-init", "node", "dist/main.js"]