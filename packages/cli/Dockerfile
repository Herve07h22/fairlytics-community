FROM node:16-alpine
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache curl
WORKDIR /usr

COPY ./packages/cli .
RUN yarn

