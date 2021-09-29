FROM node:14-alpine AS builder
RUN apk add --update bash git
RUN rm -rf /var/cache/apk/*
WORKDIR /usr/src/app

COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json

RUN mkdir public || true
COPY ./packages/caisy-documentation ./packages/caisy-documentation
COPY ./packages/league ./packages/league
RUN yarn install --frozen-lockfile --check-files
RUN yarn build:caisy-documentation
RUN rm -rf node_modules
ENV NODE_ENV production
RUN yarn --production --frozen-lockfile

# Build Stage 2
# This build takes the production build from builder
FROM node:14-alpine
RUN apk add --update bash 

WORKDIR /usr/src/app
COPY --from=builder usr/src/app/ ./
ENV NODE_ENV production
CMD yarn start:caisy-documentation -p 3000
