# Install dependencies
FROM node:20-alpine AS deps
WORKDIR /app

# Prevent Prisma from generating client prematurely
ENV PRISMA_GENERATE_SKIP_AUTOMATICALLY=true

COPY package.json package-lock.json* ./
RUN npm ci

# Build Prisma client separately
FROM node:20-alpine AS prisma
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

# Build Next.js app
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=prisma /app ./

RUN npm run build

# Final image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

# Prevent Next.js telemetry prompt
ENV NEXT_TELEMETRY_DISABLED 1

# Only copy necessary files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["npm", "start"]
