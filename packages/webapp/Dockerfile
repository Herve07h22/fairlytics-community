# Install dependencies only when needed
FROM node:16-alpine AS builder

RUN apk add --no-cache libc6-compat curl
WORKDIR /app

# Le contexte de build est la racine du monorepo : l'image s'installe depuis le
# yarn.lock du workspace, donc avec les versions contre lesquelles les tests tournent.
# Les manifestes d'abord, pour que le cache Docker ne réinstalle pas à chaque
# modification du code.
COPY package.json yarn.lock ./
COPY packages/webapp/package.json packages/webapp/
COPY packages/website/package.json packages/website/
COPY packages/cli/package.json packages/cli/
RUN yarn install --frozen-lockfile

COPY packages/webapp packages/webapp
RUN yarn workspace @fairlytics/webapp build

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Default user is node:node
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/packages/webapp/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/packages/webapp/.next/static ./packages/webapp/.next/static
COPY --from=builder /app/packages/webapp/public ./packages/webapp/public

# fillHtmlTemplate() résout le template à partir du répertoire courant, soit /app.
COPY --from=builder /app/packages/webapp/adapters/*.html .

# TODO : changing to nextjs user causes an issue when the API whan to access to
# the elastic certs (owner : 1000:1000)
# USER nextjs

RUN mkdir /app/db
RUN mkdir /app/certs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "packages/webapp/server.js"]
