FROM node:14-alpine AS builder
RUN apk add --update bash git
RUN rm -rf /var/cache/apk/*
WORKDIR /usr/src/app

COPY ./yarn.lock ./yarn.lock
COPY ./package.json ./package.json
RUN yarn install --frozen-lockfile --check-files

COPY ./ ./

ENV NODE_ENV production
CMD yarn build && yarn start 
