# Install dependencies only when needed
FROM node:16-alpine AS builder

RUN apk add --no-cache libc6-compat curl
WORKDIR /app
COPY ./packages/webapp .
RUN yarn && yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Default user is node:node
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

COPY --from=builder /app/packages/webapp/adapters/*.html .

# TODO : changing to nextjs user causes an issue when the API whan to access to
# the elastic certs (owner : 1000:1000)
# USER nextjs

RUN mkdir /app/db 
RUN mkdir /app/certs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
