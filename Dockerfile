### Dependency Cacher
### -------------------------
FROM endeveit/docker-jq:latest as deps

# To prevent cache invalidation from changes in fields other than dependencies
# https://stackoverflow.com/a/59606373
COPY package.json /tmp
RUN jq '{ dependencies, devDependencies, resolutions }' < /tmp/package.json > /tmp/deps.json

### Fat Build
### -------------------------
FROM node:12.16.1-alpine AS builder

WORKDIR /usr/pg-amqp-bridge

# Cache dependencies
COPY --from=deps /tmp/deps.json ./package.json
COPY yarn.lock ./
RUN yarn install

# Copy application codebase
COPY . .
RUN yarn run build

### Slim Deploy
### -------------------------
FROM node:12.16.1-alpine

WORKDIR /usr/pg-amqp-bridge

# Install and cache production dependencies
COPY --from=deps /tmp/deps.json ./package.json
COPY yarn.lock ./
RUN yarn install --production

# Copy only the built source
COPY --from=builder /usr/pg-amqp-bridge/dist ./dist

COPY package.json ./

# Run the production compiled code
EXPOSE 3000
CMD [ "node", "./dist/index.js" ]
