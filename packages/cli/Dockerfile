FROM node:16-alpine
RUN apk add --no-cache libc6-compat curl
WORKDIR /usr

COPY ./packages/cli .
RUN yarn

