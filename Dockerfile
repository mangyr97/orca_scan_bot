FROM node:16.20.0-alpine3.17

RUN apk update && apk add --no-cache libtool autoconf automake linux-headers gcc g++ cmake python3 git make

WORKDIR /app

COPY src /app/src

# Install
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

# Config
COPY tsconfig.json /app/tsconfig.json
COPY .env /app/.env

# Build
RUN npm ci
RUN npm run build

# Clean
RUN rm -rf /app/package-lock.json
RUN rm -rf /app/tsconfig.json
RUN rm -rf /app/src

ENV NODE_OPTIONS="--max-old-space-size=4096"

CMD node dist/app.js