# Multi-stage Docker build for Auth Service
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
COPY lerna.json ./
COPY packages/auth/package*.json ./packages/auth/
COPY packages/shared/package*.json ./packages/shared/
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run the app
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=builder /app/packages/auth/dist ./dist
COPY --from=builder /app/packages/auth/package*.json ./
COPY --from=deps /app/node_modules ./node_modules

USER nestjs

EXPOSE 3001

ENV PORT 3001

CMD ["node", "dist/main"]