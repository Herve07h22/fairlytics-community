# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache curl
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY ./packages/webapp/package.json /packages/webapp/yarn.lock* ./
RUN yarn

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /app
COPY ./packages/webapp .
COPY --from=deps /app/node_modules ./node_modules

ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Default user is node:node
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# TODO : changing to nextjs user causes an issue when the API whan to access to
# the elastic certs (owner : 1000:1000)
# USER nextjs

RUN mkdir /app/db 
RUN mkdir /app/certs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
