# 1. Base dependencies layer
FROM node:20-alpine AS deps
WORKDIR /app
ENV PRISMA_GENERATE_SKIP_AUTOMATICALLY=true
COPY package.json package-lock.json* ./
RUN npm ci

# 2. Copy source and install wait-for-it
FROM node:20-alpine AS builder
WORKDIR /app

# Install bash (required for wait-for-it)
RUN apk add --no-cache bash

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Add wait-for-it.sh script (you can replace this URL with a local copy if you prefer)
ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Generate Prisma Client
RUN npx prisma generate

# Run build after DB is ready
CMD ["sh", "-c", "./wait-for-it.sh postgres:5432 -- npm run build && npm start"]
