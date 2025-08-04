# API Gateway Dockerfile
FROM node:18-alpine AS base
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

# Build the application
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx nx build api-gateway

# Production image
FROM base AS runner
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist/apps/api-gateway ./
COPY --from=builder /app/.env ./.env

USER nestjs

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=production

CMD ["node", "main.js"]